import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
	process.env.NODE_ENV === 'production' ?
		'http://localhost:3005'
	:	'http://localhost:3005';

export const socket = io(URL);
