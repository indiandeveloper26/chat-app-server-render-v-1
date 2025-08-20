// ✅ Mongoose Schema
import mongoose from "mongoose";


const DownloadSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});
const Download = mongoose.model('Download', DownloadSchema);

export default Download;