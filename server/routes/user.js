import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils.js';
const userRouter = express.Router();

userRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const { email, name, password, picture } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(404).send('email already exist');
    } else {
      password = bcryptjs.hashSync(password);
      const user = new User({ name, email, password, picture });
      await user.save();
      const { _id, name, email, picture, status, newMessage } = user;
      res
        .status(201)
        .send({
          _id,
          name,
          email,
          picture,
          status,
          newMessage,
          token: generateToken(user),
        });
    }
  })
);

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send('email does not Exist');
      return;
    }
    if (bcryptjs.compareSync(req.body.password, user.password)) {
      user.status = 'online';
      await user.save();
      const { _id, name, email, picture, status, newMessage } = user;
      res
        .status(200)
        .send({
          _id,
          name,
          email,
          picture,
          status,
          newMessage,
          token: generateToken(user),
        });
    } else {
      res.status(401).send({ message: 'password is not correct' });
    }
  })
);

export default userRouter;
