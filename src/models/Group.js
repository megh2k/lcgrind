import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model,
      default: [],
    },
  ],
});

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
