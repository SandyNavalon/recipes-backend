
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordVerification: {type: String},
    user: { type: String },
    recipes: [{ type: mongoose.Types.ObjectId, ref: 'recipes' }],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
