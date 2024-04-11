import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_URL, {
  path: "/ws/socket.io/",
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Connected", socket.id);
});

export default socket;
