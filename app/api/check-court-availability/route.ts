import { NextResponse } from "next/server";

/**
 * Check court availability from rhinebecktennis.com
 * This endpoint checks the external site and returns availability status
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // YYYY-MM-DD format
    const hour = searchParams.get("hour"); // 9-19

    if (!date || !hour) {
      return NextResponse.json(
        { error: "Date and hour parameters required" },
        { status: 400 }
      );
    }

    // Fetch rhinebecktennis.com to check availability
    // Note: This is a placeholder - you'll need to adjust based on their actual site structure
    const response = await fetch("https://rhinebecktennis.com", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DiFazioTennis/1.0)",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch rhinebecktennis.com:", response.status);
      // If we can't check, assume available (fail open)
      return NextResponse.json({
        available: true,
        error: "Could not check external site",
        date,
        hour: parseInt(hour),
      });
    }

    const html = await response.text();

    // Parse the HTML to find court availability
    // This will need to be customized based on rhinebecktennis.com's actual structure
    // Example: Look for specific date/time patterns, class names, etc.
    
    // For now, we'll check if the date/time appears to be booked
    // You'll need to adjust this based on how rhinebecktennis.com displays availability
    
    const dateObj = new Date(date + "T12:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Check for indicators that the court is NOT available
    // This is a placeholder - adjust based on actual site structure
    const isUnavailable = 
      html.includes("unavailable") ||
      html.includes("booked") ||
      html.includes("reserved") ||
      html.toLowerCase().includes(`court not available`) ||
      false; // Default to available if we can't determine

    return NextResponse.json({
      available: !isUnavailable,
      date,
      hour: parseInt(hour),
      checkedAt: new Date().toISOString(),
      source: "rhinebecktennis.com",
    });

  } catch (error: any) {
    console.error("Error checking court availability:", error);
    // Fail open - if we can't check, assume available
    return NextResponse.json({
      available: true,
      error: error.message,
    });
  }
}

/**
 * Batch check multiple time slots
 */
export async function POST(request: Request) {
  try {
    const { slots } = await request.json(); // Array of {date, hour}

    if (!Array.isArray(slots)) {
      return NextResponse.json(
        { error: "Slots array required" },
        { status: 400 }
      );
    }

    // Check each slot
    const results = await Promise.all(
      slots.map(async (slot: { date: string; hour: number }) => {
        try {
          const response = await fetch(
            `${request.url.split("?")[0]}?date=${slot.date}&hour=${slot.hour}`
          );
          const data = await response.json();
          return {
            ...slot,
            available: data.available,
          };
        } catch (error) {
          return {
            ...slot,
            available: true, // Fail open
          };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

