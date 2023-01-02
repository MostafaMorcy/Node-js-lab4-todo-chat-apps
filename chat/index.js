import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import faker from '@faker-js/faker';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use('/static', express.static('static'));

io.on('connection', (socket) => {
  console.log('a user connected');
  const name = faker.name.firstName();
  socket.broadcast.emit("message broadcast", {
    message: ` has entered the room`,
    user: name
  });
  socket.on("message send", data => {
    socket.broadcast.emit("message broadcast", { message: data, user: name });
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.broadcast.emit("message broadcast", {
      message: ` has left the room`,
      user: name
    })
  });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
httpServer.listen(3000);
