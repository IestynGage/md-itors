// TODO add HMR cleaning function for the ws.
// It needs to close all the sockets...

import type { BunSocket } from ".";
import { EventType, type NewUserEvent, type UserLeaveEvent } from "./broadcast-message";

/**
 * When 1 or more users are looking at a file,
 * the collection of users are in a file room.
 */
interface FileRoomPro {
	fileName: string;
	usersIds: string[];
}

// function to enter room. Also includes exiting the last room...

interface Location {
	line: number;
	column: number;
}

export class FileRoom {
	// Change to something better
	users: Map<string, User>;

	constructor() {
		this.users = new Map();
		console.log("asdasd");
	}

	addUser(username: string, socket: BunSocket) {
		this.users.getOrInsert(username, new User(username, socket));
		
		const newUserEvent:NewUserEvent = {
			type: EventType.UserJoin,
			user: username
		}
		this.broadcast(JSON.stringify(newUserEvent));
	}

	removeUser(username: string) {
		const user = this.users.get(username);
		if (user) {
			user.webSocket.close();	
		}
		const removeUserEvent:UserLeaveEvent = {
			type: EventType.UserLeave,
			user: username
		}
		this.broadcast(JSON.stringify(removeUserEvent));
	}

	cursorMove(username: string, newCursorLocation: Location) {}

	broadcast(message: string | Buffer<ArrayBuffer>) {
		if (typeof message === 'string') {
			const a = JSON.parse(message);
			console.log(a);

			if (a.type && typeof a.type === 'string') {
				switch (a.type) {
					case 'CarrotMove':
						this.users.forEach((user, id, map) => {
							user.webSocket.send(`${message}`);
						});
						break;
					default:
						this.users.forEach((user, id, map) => {
							user.webSocket.send(`${message}`);
						});
						break;
				}
			}
		}
		// const msg = JSON.parse(message);
		// console.log(msg)
		// this.users.forEach((user, id, map) => {
		// 	user.webSocket.send(`${message}`);
		// });
	}

	// Clean all websockets...
}

class User {
	username: string;
	webSocket: BunSocket;

	constructor(username: string, webSocket: BunSocket) {
		this.username = username;
		this.webSocket = webSocket;
	}
}
