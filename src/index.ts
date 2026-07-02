import { FileRoom } from "./FileRoom";
import homepage from "./frontend/index.html";
import spa from "./frontend/spa.html";

// const indexPath = new URL("./index.html", import.meta.url);
const fileRoom = new FileRoom();

export type BunSocket = Bun.ServerWebSocket<{ socketId: string; }>

const server = Bun.serve({
	development: true,
	port: 3000,
	routes: {
		"/": homepage,
    "/spa": spa
	},
	fetch(req, server) {
		const url = new URL(req.url);

		if (url.pathname === "/ws") {
      const success = server.upgrade(req, {
        data: {
          socketId: `user-${Math.floor(Math.random() * 1_000)}`,
        },
      });
			if (success) return undefined;
			return new Response("WebSocket upgrade failed", { status: 400 });
		}

		return new Response();
	},

	websocket: {
    data: {} as { socketId: string },
		open(ws) {
			const userId = ws.data.socketId;
			console.log(`Client ${userId} connected`);
			fileRoom.addUser(userId, ws);
      // TODO broadcast current file
		},

		message(ws, message) {
			fileRoom.broadcast(`${message}`);
		},

		close(ws) {
			fileRoom.removeUser(ws.data.socketId);
		},
	},
});

console.log(`Server running at http://${server.hostname}:${server.port}`);
