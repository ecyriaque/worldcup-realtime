#!/bin/bash

# Script de réinitialisation de la base de données
# Ce script détruit complètement la base de données et la recrée

set -e  # Arrête en cas d'erreur

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Réinitialisation complète de la base de données ===${NC}\n"

# Se déplacer dans le répertoire du projet
cd "$(dirname "$0")/.."

echo -e "${YELLOW}Étape 1/5: Arrêt et suppression des containers et volumes...${NC}"
docker compose down -v 2>/dev/null && echo -e "${GREEN}✅ Containers et volumes supprimés${NC}"

echo -e "\n${YELLOW}Étape 2/5: Redémarrage des containers...${NC}"
docker compose up -d && echo -e "${GREEN}✅ Containers démarrés${NC}"

echo -e "\n${YELLOW}Étape 3/5: Attente du démarrage de PostgreSQL...${NC}"
# Attendre que PostgreSQL soit prêt
for i in {1..30}; do
    if docker exec worldcup_db pg_isready -U worldcup >/dev/null 2>&1; then
        echo -e "${GREEN}✅ PostgreSQL est prêt (${i} tentatives)${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Timeout waiting for PostgreSQL${NC}"
        exit 1
    fi
    sleep 1
done

# Attendre que l'initialisation soit terminée
echo -e "${YELLOW}Attente de l'initialisation des seeds...${NC}"
sleep 8

echo -e "\n${YELLOW}Étape 4/5: Vérification de l'initialisation automatique...${NC}"
# Les fichiers init/ sont exécutés automatiquement par Docker
TABLES_COUNT=$(docker exec worldcup_db psql -U worldcup -d worldcup -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" 2>/dev/null | tr -d '[:space:]')

if [ ! -z "$TABLES_COUNT" ] && [ "$TABLES_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ Base de données initialisée automatiquement (${TABLES_COUNT} tables)${NC}"
else
    echo -e "${RED}❌ Erreur d'initialisation (tables count: '${TABLES_COUNT}')${NC}"
    echo -e "${YELLOW}Vérification des logs...${NC}"
    docker logs worldcup_db --tail 20
    exit 1
fi

echo -e "\n${YELLOW}Étape 5/5: Redémarrage du backend pour reconnecter...${NC}"
docker compose restart backend && echo -e "${GREEN}✅ Backend redémarré${NC}"
sleep 3

echo -e "\n${GREEN}=== Base de données réinitialisée avec succès ! ===${NC}\n"

# Afficher quelques statistiques
echo -e "${YELLOW}📊 Statistiques:${NC}"
docker exec worldcup_db psql -U worldcup -d worldcup -c "
SELECT 
    'Compétitions' as table_name, COUNT(*) as count FROM competition
UNION ALL
SELECT 'Phases', COUNT(*) FROM phase
UNION ALL
SELECT 'Équipes', COUNT(*) FROM team
UNION ALL
SELECT 'Groupes', COUNT(*) FROM group_stage
UNION ALL
SELECT 'Matchs', COUNT(*) FROM match
UNION ALL
SELECT 'Joueurs', COUNT(*) FROM player
UNION ALL
SELECT 'Événements', COUNT(*) FROM match_event
UNION ALL
SELECT 'Classements', COUNT(*) FROM group_standing;
" 2>/dev/null

echo -e "\n${GREEN}✨ Prêt à l'utilisation !${NC}"
