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
	line:number;
	column:number;
}

export class FileRoom {

	// Change to something better
	users: Map<string, User>;

	constructor() { 
		this.users = new Map();
	}


	addUser(username:string, socket:Bun.ServerWebSocket) {
		this.users.getOrInsert(username, new User(username, socket));
	}

	cursorMove(username:string, newCursorLocation:Location) {

	}

	broadcast(message:string) {
		this.users.forEach((user, id, map) => {
			user.webSocket.send(`Server echo: ${message}`)
		});
	}

	// putText()
}

class User {
	username: string;
	webSocket: Bun.ServerWebSocket;

	constructor(username:string, webSocket:Bun.ServerWebSocket) {
		this.username = username;
		this.webSocket = webSocket
	}
}