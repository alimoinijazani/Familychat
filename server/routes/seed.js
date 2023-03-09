import express from 'express';
import { data } from './../data.js';
import User from './../models/User.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await User.deleteMany();
  const user = await User.insertMany(data.users);
  res.status(200).send(user);
});

export default seedRouter;
