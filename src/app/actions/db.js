import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function getUserByEmail(email) {
    const db = await connectToDB();
    const user = await User.findOne({ email });
    return user;
}

// export async function createUser(username, email) {
//     try {
//       const response = await fetch(process.env.APP_URL + '/api/users/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log('User created:', data.user);
//       } else {
//         console.error('Error:', data.error);
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//     }
//   }
  
//   // Example usage
// //   createUser('johndoe', 'johndoe@example.com');
  