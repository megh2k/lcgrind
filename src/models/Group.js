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
      ref: 'User',
      default: [],
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    default: '/designer.jpeg',
  },
  description: {
    type: String,
    maxlength: 250,
    default: '',
  },
});

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
