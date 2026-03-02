#!/usr/bin/env node

/**
 * Script de test pour simuler un match en direct
 * Usage: node test-realtime.js [matchId]
 */

const matchId = process.argv[2] || 1;
const API_URL = process.env.API_URL || 'http://localhost:3000';

console.log('🏆 Simulation d\'un match en direct');
console.log(`📍 Match ID: ${matchId}`);
console.log(`🌐 API: ${API_URL}\n`);

let homeScore = 0;
let awayScore = 0;
let minute = 0;

async function updateMatch(status, home, away) {
  try {
    const response = await fetch(`${API_URL}/api/matches/${matchId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        homeScore: home,
        awayScore: away,
      }),
    });
    
    if (response.ok) {
      console.log(`✅ [${minute}']: ${home} - ${away} | Status: ${status}`);
    } else {
      console.error(`❌ Erreur: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Erreur:`, error.message);
  }
}

async function simulateMatch() {
  // Début du match
  console.log('\n🟢 Début du match!\n');
  await updateMatch('LIVE', 0, 0);
  await sleep(3000);

  // Simulation du match
  const events = [
    { minute: 12, home: 1, away: 0, msg: '⚽ But pour l\'équipe à domicile!' },
    { minute: 23, home: 1, away: 1, msg: '⚽ Égalisation!' },
    { minute: 45, home: 1, away: 1, msg: '⏸️  Mi-temps' },
    { minute: 52, home: 2, away: 1, msg: '⚽ But pour l\'équipe à domicile!' },
    { minute: 67, home: 2, away: 2, msg: '⚽ Égalisation!' },
    { minute: 78, home: 3, away: 2, msg: '⚽ But pour l\'équipe à domicile!' },
    { minute: 90, home: 3, away: 2, msg: '🏁 Coup de sifflet final!' },
  ];

  for (const event of events) {
    await sleep(4000);
    minute = event.minute;
    console.log(`\n${event.msg}`);
    await updateMatch('LIVE', event.home, event.away);
  }

  // Fin du match
  await sleep(3000);
  console.log('\n🏁 Match terminé!\n');
  await updateMatch('FINISHED', homeScore = 3, awayScore = 2);
  
  console.log('\n✨ Simulation terminée. Vérifiez votre frontend!\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Lancement
simulateMatch().catch(console.error);
