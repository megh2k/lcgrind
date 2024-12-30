import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same email
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group', // Reference to the Group model,
      default: [],
    },
  ],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
