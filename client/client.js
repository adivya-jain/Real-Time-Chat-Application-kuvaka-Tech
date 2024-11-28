// Import required modules
const net = require("net");
const readline = require("readline");

// Server connection details
const PORT = 3000;
const HOST = "127.0.0.1";

// Connect to the server
const client = net.createConnection(PORT, HOST, () => {
  console.log("Connected to server");
});

// Read server messages and display them
client.on("data", (data) => {
  console.log(data.toString().trim());
});

// Handle server disconnection
client.on("end", () => {
  console.log("Disconnected from server");
});

// Handle client-side errors
client.on("error", (err) => {
  console.error(`Client error: ${err.message}`);
});

// Read input from the user and send it to the server
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  client.write(line);
});
