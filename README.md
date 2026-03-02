# worldcup-realtime

Application temps réel pour suivre les matchs de la Coupe du Monde avec WebSocket.

## 🚀 Démarrage rapide

### Prérequis

- Docker & Docker Compose
- Node.js 20+ (pour développement local)

### Installation

1. **Cloner le repository**

   ```bash
   git clone <repository-url>
   cd worldcup-realtime
   ```

2. **Configurer les variables d'environnement**

   ```bash
   cp .env.example .env
   ```

   Modifiez `.env` selon vos besoins (les valeurs par défaut fonctionnent pour le développement local).

3. **Lancer avec Docker**

   ```bash
   docker compose up --build
   ```

   L'application sera disponible sur :
   - Frontend : http://localhost:5173
   - Backend API : http://localhost:3000
   - Base de données : localhost:5432

### Développement local (sans Docker)

1. **Base de données**
   Démarrez uniquement PostgreSQL avec Docker :

   ```bash
   docker compose up db
   ```

2. **Backend**

   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Frontend**
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

## ⚙️ Configuration

### Variables d'environnement

Toutes les variables sont définies dans `.env` à la racine du projet.

#### Base de données

- `POSTGRES_DB` : Nom de la base de données
- `POSTGRES_USER` : Utilisateur PostgreSQL
- `POSTGRES_PASSWORD` : Mot de passe PostgreSQL
- `DB_HOST` : Hôte de la base (db pour Docker, localhost pour local)
- `DB_PORT` : Port PostgreSQL (5432 par défaut)

#### Backend

- `PORT` : Port du serveur backend (3000 par défaut)
- `CORS_ORIGIN` : Origines autorisées pour CORS (séparées par des virgules)

#### Frontend

- `VITE_API_URL` : URL de l'API backend
- `VITE_WS_URL` : URL du serveur WebSocket

### Structure du projet

```
worldcup-realtime/
├── backend/          # API Node.js + WebSocket
├── frontend/         # Application React + Vite
├── db/              # Scripts et migrations PostgreSQL
├── docker-compose.yml
├── .env             # Variables d'environnement (non versionné)
└── .env.example     # Template de configuration
```

## 📝 Scripts disponibles

### Backend

- `npm run dev` : Démarrage en mode développement avec nodemon
- `npm start` : Démarrage en mode production

### Frontend

- `npm run dev` : Serveur de développement Vite
- `npm run build` : Build de production
- `npm run preview` : Prévisualisation du build
