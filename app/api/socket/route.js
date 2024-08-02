import { Server } from 'socket.io';

let io;

export async function GET(request) {
  if (!io) {
    io = new Server({
      cors: {
        origin: '*', // Adjust this to your domain or use specific origins
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('sendMessage', (message) => {
        io.emit('newMessage', message); // Broadcast the message to all clients
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    console.log('Socket.io server initialized');
  }

  return new Response('Socket.io server running');
}
