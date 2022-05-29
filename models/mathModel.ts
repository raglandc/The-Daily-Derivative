import { Schema, model, models } from "mongoose";

const mathSchema = new Schema({
  date: String,
  problemNumber: String,
  description: String,
  problem: String,
  solution: String,
  difficulty: String,
  answer: String,
  hint: String,
});

const Math = models.Math || model("Math", mathSchema);

export default Math;
