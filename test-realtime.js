#!/usr/bin/env node

/**
 * Script de test pour simuler un match en direct avec événements aléatoires
 * Usage: node test-realtime.js [matchId]
 */

const matchId = process.argv[2] || 1;
const API_URL = process.env.API_URL || "http://localhost:3000";

console.log("🏆 Simulation d'un match en direct");
console.log(`📍 Match ID: ${matchId}`);
console.log(`🌐 API: ${API_URL}\n`);

let homeScore = 0;
let awayScore = 0;
let minute = 0;
let matchData = null;
let homePlayers = [];
let awayPlayers = [];

async function updateMatch(status, home, away, currentMinute) {
  try {
    const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        homeScore: home,
        awayScore: away,
        currentMinute,
      }),
    });

    if (response.ok) {
      console.log(
        `✅ [${currentMinute}']: ${home} - ${away} | Status: ${status}`,
      );
    } else {
      console.error(`❌ Erreur: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
  }
}

async function fetchMatchData() {
  try {
    console.log("📥 Récupération des données du match...\n");
    const response = await fetch(`${API_URL}/api/matches/${matchId}`);
    if (!response.ok) throw new Error("Match introuvable");
    matchData = await response.json();

    console.log(
      `🏟️  ${matchData.homeTeam.name} 🆚 ${matchData.awayTeam.name}\n`,
    );

    // Récupérer les joueurs des deux équipes
    const [homeRes, awayRes] = await Promise.all([
      fetch(`${API_URL}/api/players/team/${matchData.homeTeam.teamId}`),
      fetch(`${API_URL}/api/players/team/${matchData.awayTeam.teamId}`),
    ]);

    const homePlayersData = await homeRes.json();
    const awayPlayersData = await awayRes.json();
    
    homePlayers = homePlayersData.filter((p) => p.position !== "GOALKEEPER");
    awayPlayers = awayPlayersData.filter((p) => p.position !== "GOALKEEPER");

    console.log(
      `✅ ${homePlayers.length} joueurs ${matchData.homeTeam.name}`,
    );
    console.log(
      `✅ ${awayPlayers.length} joueurs ${matchData.awayTeam.name}\n`,
    );
  } catch (error) {
    console.error("❌ Erreur lors du chargement du match:", error.message);
    process.exit(1);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(array) {
  return array[randomInt(0, array.length - 1)];
}

function getPlayerName(player) {
  return `${player.firstName} ${player.lastName}`;
}

async function createMatchEvent(
  teamId,
  eventType,
  playerName,
  minute,
  extraInfo = null,
) {
  try {
    const response = await fetch(`${API_URL}/api/match-events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId: Number(matchId),
        teamId,
        eventType,
        playerName,
        minute,
        extraInfo,
      }),
    });

    if (response.ok) {
      const event = await response.json();
      const icon = {
        GOAL: "⚽",
        YELLOW_CARD: "🟨",
        RED_CARD: "🟥",
        SUBSTITUTION: "🔄",
      }[eventType];
      console.log(`   ${icon} ${playerName} ${extraInfo ? `(${extraInfo})` : ""}`);
      return event;
    } else {
      console.error(
        `❌ Erreur événement: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error(`❌ Erreur événement:`, error.message);
  }
}

function generateMatchEvents() {
  const events = [];
  const usedMinutes = new Set();
  const goalScorers = { home: {}, away: {} };

  // Nombre aléatoire d'événements
  const numGoals = randomInt(2, 6); // 2 à 6 buts total
  const numYellowCards = randomInt(2, 5);
  const numSubstitutions = randomInt(2, 4);
  const numRedCards = Math.random() > 0.7 ? 1 : 0; // 30% chance

  // Générer des minutes uniques
  function getUniqueMinute(min, max) {
    let attempts = 0;
    while (attempts < 100) {
      const m = randomInt(min, max);
      if (!usedMinutes.has(m)) {
        usedMinutes.add(m);
        return m;
      }
      attempts++;
    }
    return randomInt(min, max);
  }

  // Buts
  for (let i = 0; i < numGoals; i++) {
    const isHome = Math.random() > 0.5;
    const minute = getUniqueMinute(5, 88);
    const players = isHome ? homePlayers : awayPlayers;
    const teamId = isHome
      ? matchData.homeTeam.teamId
      : matchData.awayTeam.teamId;

    if (players.length === 0) continue;

    const player = pickRandom(players);
    const playerName = getPlayerName(player);

    // Compter les buts du joueur
    const side = isHome ? "home" : "away";
    goalScorers[side][playerName] = (goalScorers[side][playerName] || 0) + 1;

    const extraInfo =
      goalScorers[side][playerName] === 2
        ? "Doublé!"
        : goalScorers[side][playerName] === 3
          ? "Triplé!"
          : null;

    events.push({
      minute,
      type: "GOAL",
      teamId,
      playerName,
      isHome,
      extraInfo,
    });
  }

  // Cartons jaunes
  for (let i = 0; i < numYellowCards; i++) {
    const isHome = Math.random() > 0.5;
    const minute = getUniqueMinute(10, 85);
    const players = isHome ? homePlayers : awayPlayers;
    const teamId = isHome
      ? matchData.homeTeam.teamId
      : matchData.awayTeam.teamId;

    if (players.length === 0) continue;

    const player = pickRandom(players);
    events.push({
      minute,
      type: "YELLOW_CARD",
      teamId,
      playerName: getPlayerName(player),
      isHome,
    });
  }

  // Carton rouge
  if (numRedCards > 0) {
    const isHome = Math.random() > 0.5;
    const minute = getUniqueMinute(60, 87);
    const players = isHome ? homePlayers : awayPlayers;
    const teamId = isHome
      ? matchData.homeTeam.teamId
      : matchData.awayTeam.teamId;

    if (players.length > 0) {
      const player = pickRandom(players);
      events.push({
        minute,
        type: "RED_CARD",
        teamId,
        playerName: getPlayerName(player),
        isHome,
      });
    }
  }

  // Remplacements
  for (let i = 0; i < numSubstitutions; i++) {
    const isHome = Math.random() > 0.5;
    const minute = getUniqueMinute(46, 85);
    const players = isHome ? homePlayers : awayPlayers;
    const teamId = isHome
      ? matchData.homeTeam.teamId
      : matchData.awayTeam.teamId;

    if (players.length < 2) continue;

    const playerIn = pickRandom(players);
    const playerOut = pickRandom(players.filter((p) => p !== playerIn));

    events.push({
      minute,
      type: "SUBSTITUTION",
      teamId,
      playerName: getPlayerName(playerIn),
      extraInfo: `Sort: ${getPlayerName(playerOut)}`,
      isHome,
    });
  }

  // Trier par minute
  return events.sort((a, b) => a.minute - b.minute);
}

async function simulateMatch() {
  // Charger les données du match
  await fetchMatchData();

  // Générer les événements aléatoires
  console.log("🎲 Génération des événements aléatoires...\n");
  const events = generateMatchEvents();

  // Début du match
  console.log("🟢 Coup d'envoi!\n");
  await updateMatch("LIVE", 0, 0, 0);
  await sleep(2000);

  let currentHomeScore = 0;
  let currentAwayScore = 0;
  let lastMinute = 0;

  // Jouer les événements
  for (const event of events) {
    // Attendre un peu
    await sleep(randomInt(2000, 4000));

    // Afficher la minute
    if (event.minute !== lastMinute) {
      console.log(`\n⏱️  ${event.minute}'`);
      lastMinute = event.minute;
    }

    // Gérer le but
    if (event.type === "GOAL") {
      if (event.isHome) {
        currentHomeScore++;
        console.log(
          `   ⚽ BUT ${matchData.homeTeam.name}! ${currentHomeScore}-${currentAwayScore}`,
        );
      } else {
        currentAwayScore++;
        console.log(
          `   ⚽ BUT ${matchData.awayTeam.name}! ${currentHomeScore}-${currentAwayScore}`,
        );
      }
    }

    // Créer l'événement
    await createMatchEvent(
      event.teamId,
      event.type,
      event.playerName,
      event.minute,
      event.extraInfo,
    );

    // Mettre à jour le score
    await updateMatch("LIVE", currentHomeScore, currentAwayScore, event.minute);

    // Mi-temps
    if (event.minute >= 45 && lastMinute < 45) {
      await sleep(1500);
      console.log("\n⏸️  Mi-temps\n");
    }
  }

  // Fin du match
  await sleep(2000);
  console.log(`\n🏁 Coup de sifflet final!`);
  console.log(
    `\n📊 Score final: ${matchData.homeTeam.name} ${currentHomeScore} - ${currentAwayScore} ${matchData.awayTeam.name}\n`,
  );
  await updateMatch("FINISHED", currentHomeScore, currentAwayScore, 90);

  console.log("✨ Simulation terminée. Vérifiez votre frontend!\n");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Lancement
simulateMatch().catch(console.error);
