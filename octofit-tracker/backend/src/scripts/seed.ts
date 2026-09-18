import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex.johnson',
        email: 'alex.johnson@example.com',
        profile: { displayName: 'Alex Johnson', goal: 'Build strength' },
      },
      {
        username: 'jamie.lee',
        email: 'jamie.lee@example.com',
        profile: { displayName: 'Jamie Lee', goal: 'Improve endurance' },
      },
      {
        username: 'morgan.smith',
        email: 'morgan.smith@example.com',
        profile: { displayName: 'Morgan Smith', goal: 'Stay consistent' },
      },
      {
        username: 'taylor.williams',
        email: 'taylor.williams@example.com',
        profile: { displayName: 'Taylor Williams', goal: 'Train for a 5K' },
      },
    ]);

    await Team.create([
      {
        name: 'Morning Movers',
        description: 'Start the day with a strong team session.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Warriors',
        description: 'Keep each other moving through the weekend.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Strength training', durationMinutes: 45, points: 90 },
      { userId: users[0]._id, type: 'Yoga', durationMinutes: 30, points: 45 },
      { userId: users[1]._id, type: 'Running', durationMinutes: 35, points: 80 },
      { userId: users[2]._id, type: 'Cycling', durationMinutes: 50, points: 95 },
      { userId: users[3]._id, type: 'Walking', durationMinutes: 40, points: 50 },
      { userId: users[3]._id, type: 'HIIT', durationMinutes: 25, points: 70 },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 135, rank: 1 },
      { userId: users[3]._id, points: 120, rank: 2 },
      { userId: users[2]._id, points: 95, rank: 3 },
      { userId: users[1]._id, points: 80, rank: 4 },
    ]);

    await Workout.create([
      {
        title: 'Full Body Foundations',
        description: 'A balanced strength session for the whole body.',
        difficulty: 'beginner',
        activityType: 'Strength training',
        durationMinutes: 30,
      },
      {
        title: 'Steady State Run',
        description: 'Build endurance with a comfortable, consistent pace.',
        difficulty: 'intermediate',
        activityType: 'Running',
        durationMinutes: 35,
      },
      {
        title: 'Power Intervals',
        description: 'Short, challenging intervals to raise your heart rate.',
        difficulty: 'advanced',
        activityType: 'HIIT',
        durationMinutes: 25,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
