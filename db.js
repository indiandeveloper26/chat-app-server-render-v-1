import mongoose from "mongoose";


export const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://sahilmummy1996:sahilmummy1996@cluster0.rs7ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1); // Exit the process with failure
    }
  };
  
  
  
  
  