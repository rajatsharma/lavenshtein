"use server";

import { levenshtein } from "@/lib/levenshtein";

export async function calculateLavenshteinOnServerAction(
  str1: string,
  str2: string,
): Promise<{ distance: number } | { error: string }> {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    return { error: "Invalid input: Both inputs must be strings." };
  }

  if (str1.length > 1000 || str2.length > 1000) {
    return { error: "Input strings are too long (max 1000 chars)." };
  }

  try {
    const distance = levenshtein(str1, str2);
    return { distance };
  } catch (e) {
    console.error("Server action error:", e);
    return { error: "Failed to calculate distance on the server." };
  }
}
