import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profile: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0, default: 0 },
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
