import { Schema, model, models } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  userStatistics: {
    currentWinningStreak: number;
    problemsAttempted: number;
    problemsSolved: number;
  };
  // problemsCompleted: [{ [problem: string]: boolean }];
  problemsCompleted: [
    {
      problemDate: string;
      remainingAttempts: number;
    }
  ];
}

const userSchema = new Schema<UserType>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Boolean || null,
  userStatistics: {
    currentWinningStreak: { type: Number, default: 0 },
    problemsAttempted: { type: Number, default: 0 },
    problemsSolved: { type: Number, default: 0 },
  },
  problemsCompleted: {
    type: [{}],
  },
});

const User = models.User || model("User", userSchema);

export default User;
