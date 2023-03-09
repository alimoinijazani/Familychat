import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    content: String,
    from: Object,
    socketid: String,
    time: String,
    date: String,
    to: String,
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
