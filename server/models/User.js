import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 50 },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    picture: { type: String, default: 'images/noAvatar.png' },
    status: { type: String, default: 'online' },
    newMessages: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
