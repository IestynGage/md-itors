/**
 * When 1 or more users are looking at a file,
 * the collection of users are in a file room.
 */

interface FileRoom {
	fileName: string;
	usersIds: string[];
}

// function to enter room. Also includes exiting the last room...
