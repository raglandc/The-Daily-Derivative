import { Schema, model, models } from "mongoose";

interface User {
  name: string;
  email: string;
  userStatistics: {
    currentWinningStreak: number;
    problemsAttempted: number;
    problemsSolved: number;
  };
}

const userSchema = new Schema<User>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userStatistics: {
    currentWinningStreak: { type: Number, default: 0 },
    problemsAttempted: { type: Number, default: 0 },
    problemsSolved: { type: Number, default: 0 },
  },
});

const User = models.User || model("User", userSchema);

export default User;
