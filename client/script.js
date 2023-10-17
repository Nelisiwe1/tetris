const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('open', (event) => {
  // Handle WebSocket connection
});

ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);

  // Handle different message types (game state updates, player joins, player leaves, etc.)
  switch (message.type) {
    case 'playerJoined':
      // Handle player joined event
      break;
    case 'gameStateUpdate':
      // Update the game state and UI based on the received game state
      break;
    // Add cases for other message types as needed
  }
});

// Send player actions to the server
function sendPlayerAction(action) {
  ws.send(JSON.stringify({ type: 'playerAction', action }));
}

// Example: Sending a player action
sendPlayerAction({ type: 'moveLeft' });
