const PORT_NUMBER = 8080;
const DOMAIN = "0.0.0.0";

Bun.serve({
  port: PORT_NUMBER,
  hostname: DOMAIN,
  routes: {
    "/api/status": new Response("OK"),
    "/socket/markdown": (req, server) => {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
  },
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws, message) {}, // a message is received
    open(ws: Bun.ServerWebSocket<undefined>) {
      console.log(ws.data);
    }, // a socket is opened
    close(ws, code, message) {}, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
});

console.log(`Starting markdown online editor on ${DOMAIN}:${PORT_NUMBER}`);
