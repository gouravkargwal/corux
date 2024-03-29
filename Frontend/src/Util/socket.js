import { io } from "socket.io-client";

const socket = io("ws://localhost:8000", {
  path: "/ws/socket.io/",
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Connected", socket.id);
});

export default socket;
