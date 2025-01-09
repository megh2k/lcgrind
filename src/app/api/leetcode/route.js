import { NextResponse } from 'next/server';

export async function POST(request) {
  const { query, variables } = await request.json();

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  return NextResponse.json(result);
}
