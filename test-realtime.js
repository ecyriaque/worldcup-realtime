#!/usr/bin/env node

/**
 * Script de test pour simuler un match en direct
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
      console.log(`   📝 Événement créé: ${eventType} - ${playerName}`);
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

async function simulateMatch() {
  // Début du match
  console.log("\n🟢 Début du match!\n");
  await updateMatch("LIVE", 0, 0, 0);
  await sleep(3000);

  // Simulation du match avec événements
  const events = [
    {
      minute: 12,
      home: 1,
      away: 0,
      msg: "⚽ But pour l'équipe à domicile!",
      event: { teamId: 1, type: "GOAL", player: "Kylian Mbappé" },
    },
    {
      minute: 18,
      home: 1,
      away: 0,
      msg: "🟨 Carton jaune",
      event: { teamId: 2, type: "YELLOW_CARD", player: "João Cancelo" },
    },
    {
      minute: 23,
      home: 1,
      away: 1,
      msg: "⚽ Égalisation!",
      event: { teamId: 2, type: "GOAL", player: "Cristiano Ronaldo" },
    },
    { minute: 45, home: 1, away: 1, msg: "⏸️  Mi-temps" },
    {
      minute: 52,
      home: 2,
      away: 1,
      msg: "⚽ But pour l'équipe à domicile!",
      event: { teamId: 1, type: "GOAL", player: "Antoine Griezmann" },
    },
    {
      minute: 61,
      home: 2,
      away: 1,
      msg: "🔄 Changement",
      event: {
        teamId: 1,
        type: "SUBSTITUTION",
        player: "Ousmane Dembélé",
        extraInfo: "Sort: Kingsley Coman",
      },
    },
    {
      minute: 67,
      home: 2,
      away: 2,
      msg: "⚽ Égalisation!",
      event: { teamId: 2, type: "GOAL", player: "Bruno Fernandes" },
    },
    {
      minute: 73,
      home: 2,
      away: 2,
      msg: "🟨 Carton jaune",
      event: { teamId: 1, type: "YELLOW_CARD", player: "Aurélien Tchouaméni" },
    },
    {
      minute: 78,
      home: 3,
      away: 2,
      msg: "⚽ But pour l'équipe à domicile!",
      event: {
        teamId: 1,
        type: "GOAL",
        player: "Kylian Mbappé",
        extraInfo: "Doublé!",
      },
    },
    {
      minute: 85,
      home: 3,
      away: 2,
      msg: "🟥 Carton rouge!",
      event: { teamId: 2, type: "RED_CARD", player: "Pepe" },
    },
    { minute: 90, home: 3, away: 2, msg: "🏁 Coup de sifflet final!" },
  ];

  for (const event of events) {
    await sleep(4000);
    minute = event.minute;
    console.log(`\n${event.msg}`);
    await updateMatch("LIVE", event.home, event.away, event.minute);

    // Créer l'événement si présent
    if (event.event) {
      await createMatchEvent(
        event.event.teamId,
        event.event.type,
        event.event.player,
        event.minute,
        event.event.extraInfo,
      );
    }
  }

  // Fin du match
  await sleep(3000);
  console.log("\n🏁 Match terminé!\n");
  await updateMatch("FINISHED", (homeScore = 3), (awayScore = 2), 90);

  console.log("\n✨ Simulation terminée. Vérifiez votre frontend!\n");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Lancement
simulateMatch().catch(console.error);
