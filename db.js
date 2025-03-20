import mongoose from "mongoose";


export const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://akgaud079:sahilmummy@cluster0.pcpf2.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1); // Exit the process with failure
    }
  };
  
  connectDB()
  
  
  