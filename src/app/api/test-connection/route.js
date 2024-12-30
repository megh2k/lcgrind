// src/app/api/testConnection/route.js

import { connectToDB } from '@/lib/mongodb';

export async function GET(req) {
  try {
    await connectToDB();
    return new Response('MongoDB connection successful', {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to connect to MongoDB', {
      status: 500,
    });
  }
}
