import { io } from "socket.io-client";

// Setting up the socket connection
const socket = io(process.env.REACT_APP_BASE_URL, {
  path: "/ws/socket.io/",
  transports: ["websocket", "polling"],
});

// Event listener for successful connection
socket.on("connect", () => {
  console.log(`Connected to server with socket id: ${socket.id}`);
});

// Event listener for connection errors
socket.on("connect_error", (error) => {
  console.error("Connection Error:", error);
});

// Handling errors that occur during communication
socket.on("error", (error) => {
  console.error("Socket Error:", error);
});

// Event listener for disconnection
socket.on("disconnect", (reason) => {
  console.log(`Disconnected: ${reason}`);
  if (reason === "io server disconnect") {
    // The disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});

// Event listener for reconnection attempts
socket.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect...");
});

// Handle successful reconnection
socket.on("reconnect", (attemptNumber) => {
  console.log(`Reconnected after ${attemptNumber} attempts`);
});

// Handle reconnection failure after all attempts
socket.on("reconnect_failed", () => {
  console.error("Failed to reconnect after all attempts");
});

export default socket;
