const indexPath = new URL("./index.html", import.meta.url);

// index.ts
const server = Bun.serve({
  port: 3000,

  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/ws") {
      const success = server.upgrade(req);
      if (success) return undefined;
      return new Response("WebSocket upgrade failed", { status: 400 });
    }

    // Serve the HTML file
    return new Response(Bun.file(indexPath));
  },

  websocket: {
    open(ws) {
      console.log("Client connected");
      ws.send("Welcome! You are connected to Bun WebSocket server.");
    },

    message(ws, message) {
      console.log("Received:", message);

      // Echo back + broadcast-style behavior
      ws.send(`Server echo: ${message}`);
    },

    close() {
      console.log("Client disconnected");
    },
  },
});

console.log(`Server running at http://${server.hostname}:${server.port}`);