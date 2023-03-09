import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import uploadRouter from './routes/uploadRoute.js';
import userRouter from './routes/user.js';
import seedRouter from './routes/seed.js';
dotenv.config();
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected...');
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/seed', seedRouter);
app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
const port = process.env.PORT || 5000;

app.listen(port, console.log(`listen port ${port}...`));
