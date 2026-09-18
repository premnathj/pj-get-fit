import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;
export async function connectDatabase() {
    try {
        await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 3000 });
        console.log('Connected to octofit_db');
    }
    catch (error) {
        console.error('MongoDB unavailable; API will continue without database access:', error);
    }
}
db.on('error', (error) => console.error('MongoDB connection error:', error));
export default db;
