const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const players = new Set();

wss.on('connection', (ws) => {
  // Assign a unique ID to the player
  const playerId = Math.random().toString(36).substr(2, 9);
  
  // Add the player to the set
  players.add({ id: playerId, socket: ws });

  // Broadcast player joined message to all players
  for (const player of players) {
    player.socket.send(JSON.stringify({ type: 'playerJoined', playerId }));
  }

  // Handle incoming messages from this player
  ws.on('message', (message) => {
    // Handle player actions and update game state accordingly

    // Broadcast the updated game state to all players
    for (const player of players) {
      if (player.socket !== ws && player.socket.readyState === WebSocket.OPEN) {
        player.socket.send(JSON.stringify({ type: 'gameStateUpdate', gameState }));
      }
    }
  });

  // Handle player disconnection
  ws.on('close', () => {
    // Remove the player from the set
    players.delete(playerId);

    // Broadcast player left message to all players
    for (const player of players) {
      player.socket.send(JSON.stringify({ type: 'playerLeft', playerId }));
    }
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
