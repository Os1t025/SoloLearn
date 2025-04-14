// src/app/api/flashcards/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Adjust this URL to match your PHP endpoint
    const phpEndpoint = "http://localhost:8000/get-flashcards.php";
    
    const res = await fetch(phpEndpoint);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}