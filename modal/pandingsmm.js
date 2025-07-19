// ./modal/PendingMessage.js

import mongoose from 'mongoose';

const PendingMessageSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// ✅ TTL Index: createdAt se 30 din baad automatic expire
PendingMessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

const PendingMessage = mongoose.model('PendingMessage', PendingMessageSchema);

export default PendingMessage;
