import mongoose from 'mongoose';

const PendingMessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
});

const PendingMessage =  mongoose.model('PendingMessage', PendingMessageSchema);









export default PendingMessage;