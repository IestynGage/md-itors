enum MessageType {
	CURSOR = 'cursor',
	EDIT = 'edit',
	OTHER = 'other',
}

function messageType(message: string): MessageType {
	const a = JSON.parse(message);
	if (a?.type && a.type === "edit") {
		return MessageType.EDIT;
	}

	return MessageType.OTHER;
}

export function parseMessage(message: string | Buffer<ArrayBuffer>) {
	if (typeof message === "string") {
		// TODO deal @throws — {SyntaxError} of JSON.parse with a try catch
		return JSON.parse(message);
	} else {
		// Figure out condition for below...
		const decoder = new TextDecoder();
		const str = decoder.decode(message);
		return JSON.parse(str);
	}
}
