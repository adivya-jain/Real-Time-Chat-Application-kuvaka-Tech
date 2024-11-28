// Import the 'net' module for creating a TCP server
const net = require("net");

// Store connected clients
const clients = [];

// Define the server port
const PORT = 3000;

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("A new client connected");

  // Add client to the list of connected clients
  clients.push(socket);

  // Handle incoming messages from the client
  socket.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients except the sender
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`Message: ${message}`);
      }
    });
  });

  // Handle client disconnect
  socket.on("end", () => {
    console.log("A client disconnected");
    clients.splice(clients.indexOf(socket), 1);
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
