import { env } from '@/config/env';
import mongoose from 'mongoose';

const MONGO_STATE_CONNECTIONS = {
  DISCONNECT: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
};

async function connect() {
  if (mongoose.connection.readyState === MONGO_STATE_CONNECTIONS.DISCONNECT) {
    mongoose.set('strictQuery', false);
    try {
      await mongoose.connect(env.MONGO_URL);
      console.log('🚀 ~ connect ~ Mongo Connected: :');
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      console.error('Failed to connect to MongoDB:', message);
    }
  }
}

async function disconnect() {
  if (mongoose.connection.readyState === MONGO_STATE_CONNECTIONS.CONNECTED) {
    if (env.isProduction) {
      await mongoose.disconnect();
      console.log('🚀 ~ connect ~ Mongo Disconnected');
    } else {
      console.log('Not disconnected due to non-production environment');
    }
  }
}

export const db = { connect, disconnect };
