import mongoose from 'mongoose';
export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://1rn20ec087shresthsingh:Shresth123@cluster0.mfeqh.mongodb.net/?');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};