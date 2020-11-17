const mongoose = require("mongoose");

const scoresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Need a title"],
    unique: [true, "Need to have a unique name"],
  },
  scoreValues: [Number],
});

const Score = mongoose.model("Score", scoresSchema);
module.exports = Score;
