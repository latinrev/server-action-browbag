import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

//Gives us the exact same result but we are limited to a single form per route.
export async function POST(request: NextRequest) {
  //GET BODY FROM REQUEST
  await fetch("https://64eebd6f219b3e2873c37341.mockapi.io/contacts", {
    method: "POST",
    /* Imagine we parse request */
    body: JSON.stringify({request }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  revalidatePath("/serveronly");
  return NextResponse.json({ success: true, now: Date.now() });
}

"/api/contacts"