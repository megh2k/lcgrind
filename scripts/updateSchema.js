import { connectToDB } from '../src/lib/mongodb.js';
import User from "../src/models/User.js";

async function updateUserSchema() {
  try {
    await connectToDB();
    const result = await User.updateMany(
      { requests: { $exists: false } },
      { $set: { requests: [] } }
    );
    console.log(`Updated ${result.modifiedCount} users out of ${result.matchedCount} matched users`);
    console.log('Schema update completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating users:', error);
    process.exit(1);
  }
}

updateUserSchema();