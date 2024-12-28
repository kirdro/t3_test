import { db } from '@/server/db';
import * as socket from 'socket.io';
import { type Server } from 'socket.io';
import http from 'http';

let server: Server | null = null;

export const stopSocketServer = async () => {
	if (server) {
		await server.close();
	}
};

export const prismaPulse = () => {
	const httpServer = http.createServer((req, res) => {
		// Define the routes
		if (req.method === 'GET' && req.url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('Server is running ...');
		} else {
			// Handle 404 Not Found
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('404 Not Found');
		}
	});

	const corsOrigins = [
		process.env.CLIENT_URL ?? 'http://localhost:3000',
		'http://localhost:3000',
	];

	const io = new socket.Server(httpServer, {
		cors: {
			origin: corsOrigins,
			methods: ['GET', 'POST'],
			credentials: true,
		},
	});
	const PORT = 3003;
	httpServer.listen(PORT, async () => {
		console.log(`socket.io server is running on port ${PORT}`);

		await streamPlayerUpdates(io);
	});

	io.on(`connection`, async (socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on(`disconnect`, () => {
			console.log(`User disconnected: ${socket.id}`);
		});

		// socket.on(`chat-message`, async (text) => {
		// 	console.log(`Received message: ${text} (${socket.id})`);
		// 	await db.post.create({
		// 		data: {
		// 			text,
		// 			senderSocketId: socket.id,
		// 		},
		// 	});
		// });
	});

	// httpServer.listen(PORT, async () => {
	// 	console.log(`socket.io server is running on port ${PORT}`);
	// 	await streamPlayerUpdates(io);
	// });
	server = io;
	async function streamPlayerUpdates(io: Server) {
		const stream = await db.post.stream();
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', stream);
		// Handle Prisma stream events
		for await (const event of stream) {
			console.log(`received event: `, event);

			io.sockets.emit('update_posts', event);
		}
	}
};
