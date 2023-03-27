import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import uploadRouter from './routes/uploadRoute.js';
import userRouter from './routes/user.js';
import seedRouter from './routes/seed.js';
import User from './models/User.js';
import Message from './models/Message.js';
import path from 'path';

dotenv.config();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected...');
  })
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
const rooms = ['Family', 'Parmin', 'Work'];
app.get('/rooms', (req, res) => {
  res.send(rooms);
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
//socket

const httpServer = http.Server(app);

async function getLastMessageFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: '$date', messageByDate: { $push: '$$ROOT' } } },
  ]);
  return roomMessages;
}
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];
    return date1 < date2 ? -1 : 1;
  });
}

const io = new Server(httpServer, {
  cors: { origin: '*', method: ['GET', 'POST'] },
});
io.on('connection', (socket) => {
  socket.on('new-user', async () => {
    const members = await User.find();
    io.emit('new-user', members);
  });
  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessageFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    socket.emit('room-messages', roomMessages);
  });

  socket.on('message-room', async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      to: room,
      time,
      date,
    });
    let roomMessages = await getLastMessageFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room);
  });
});
app.delete('/logout', async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    user.status = 'offline';
    user.newMessages = req.body.newMessages;
    await user.save();
    const members = await User.find();

    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send('somthing go wrong on server');
  }
});
const port = process.env.PORT || 5000;

httpServer.listen(port, console.log(`listen port ${port}...`));
