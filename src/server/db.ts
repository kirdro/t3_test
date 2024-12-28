import { PrismaClient } from '@prisma/client';
import { env } from '@/env';

const createPrismaClient = () =>
	new PrismaClient({
		log:
			env.NODE_ENV === 'development' ?
				['query', 'error', 'warn']
			:	['error'],
	});

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
// await stopSocketServer().then(() => {
// 	prismaPulse();
// });

// const httpServer = http.createServer((req, res) => {
// 	// Define the routes
// 	if (req.method === 'GET' && req.url === '/') {
// 		res.writeHead(200, { 'Content-Type': 'text/plain' });
// 		res.end('Server is running ...');
// 	} else {
// 		// Handle 404 Not Found
// 		res.writeHead(404, { 'Content-Type': 'text/plain' });
// 		res.end('404 Not Found');
// 	}
// });
//
// const corsOrigins = [
// 	process.env.CLIENT_URL ?? 'http://localhost:3000',
// 	'http://localhost:3000',
// ];
//
// const io = new socket.Server(httpServer, {
// 	cors: {
// 		origin: corsOrigins,
// 		methods: ['GET', 'POST'],
// 		credentials: true,
// 	},
// });
// const PORT = 3005;
// httpServer.listen(PORT, async () => {
// 	console.log(`socket.io server is running on port ${PORT}`);
//
// 	await streamPlayerUpdates(io).then((stream: unknown) => {
// 		io.sockets.emit('update_posts', stream);
// 	});
// });
//
// io.on(`connection`, async (socket) => {
// 	console.log(`User connected: ${socket.id}`);
//
// 	socket.on(`disconnect`, () => {
// 		console.log(`User disconnected: ${socket.id}`);
// 	});
//
//
// });
//
//
// server = io;
// async function streamPlayerUpdates(io: Server) {
// 	const stream = await db.post.stream();
// 	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', stream);
// 	// Handle Prisma stream events
// 	// for await (const event of stream) {
// 	// 	console.log(`received event: `, event);
// 	//
// 	// 	io.sockets.emit('update_posts', event);
// 	// }
// 	return stream;
// }
