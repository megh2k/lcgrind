import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: [],
  }],
  requests: {
    type: [{
      formData: {
        reason: String,
        experience: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    }],
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);