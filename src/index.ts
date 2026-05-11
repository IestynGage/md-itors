import { FileRoom } from "./FileRoom";
import homepage from "./index.html";

// const indexPath = new URL("./index.html", import.meta.url);
const fileRoom = new FileRoom();

const server = Bun.serve({
  development: true,
  port: 3000,
  routes: {
    "/": homepage
  },
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/ws") {
      const success = server.upgrade(req);
      if (success) return undefined;
      return new Response("WebSocket upgrade failed", { status: 400 });
    }

    

    // Serve the HTML file
    return new Response();
  },

  websocket: {
    open(ws) {
      const userId = 'user' + fileRoom.users.size;
      console.log(`Client ${userId} connected`);
      ws.send(`Welcome ${userId}! You are connected to Bun WebSocket server.`);
      fileRoom.addUser(userId, ws);
    },

    message(ws, message) {
      // const event = parseMessage(message);

      // Echo back + broadcast-style behavior
      fileRoom.broadcast(`Server echo: ${message}`)
    },

    close() {
      console.log("Client disconnected");
    },
  },
});

console.log(`Server running at http://${server.hostname}:${server.port}`);