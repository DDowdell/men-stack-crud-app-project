const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Action-Adventure', 'First-Person Shooter', 'Battle-Royale', 'Sports', 'Role-Playing'],
  },
  hoursPlayed: {
    type: Number,
    required: true,
    min: 0,
  },
  levelReached: {
    type: String,
    required: true,
    enum: ['Noob', 'Casual', 'Experienced', 'Advanced', 'Sweat']
  },
  notes: {
    type: String,
    maxLength: 100,
  }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [gameSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
