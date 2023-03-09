import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
const userRoutes = express.Router();

userRoutes.post(
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
      res.status(201).send({ name, email, picture });
    }
  })
);

export default userRoutes;
