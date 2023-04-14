import app from './app';
import dotenv from 'dotenv';
import prisma from '../prisma/prismaInstance';

dotenv.config();

const port = process.env.PORT || 8000;

const databaseConnect = async () => {
  try {
    // try to connect to db
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    throw new Error(error as string);
  }
};

const initServer = async () => {
  try {
    await databaseConnect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log('Could not connect to database', error);
  }
};

initServer();
