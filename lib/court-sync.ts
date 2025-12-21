"use client";

import { TimeSlot } from "@/lib/types";
import { timeSlots } from "@/lib/mock-data";

/**
 * Check court availability from rhinebecktennis.com and update local slots
 */
export async function syncCourtAvailability(date: string, hour: number): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/check-court-availability?date=${date}&hour=${hour}`
    );

    if (!response.ok) {
      console.error("Failed to check court availability");
      return true; // Fail open - assume available if check fails
    }

    const data = await response.json();
    return data.available ?? true;
  } catch (error) {
    console.error("Error syncing court availability:", error);
    return true; // Fail open
  }
}

/**
 * Sync all time slots for a specific date
 */
export async function syncDateAvailability(date: string): Promise<void> {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  for (const hour of hours) {
    const slotId = `${date}-${hour}`;
    const slot = timeSlots.get(slotId);

    if (slot && !slot.booked) {
      // Only check if not already booked
      const isAvailable = await syncCourtAvailability(date, hour);
      
      // Update slot availability based on external check
      if (slot.available !== isAvailable) {
        slot.available = isAvailable;
        timeSlots.set(slotId, slot);
        
        // Also update in sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.setItem(`slot_${slotId}`, JSON.stringify(slot));
        }
      }
    }
  }
}

/**
 * Sync availability for a range of dates
 */
export async function syncDateRange(startDate: Date, endDate: Date): Promise<void> {
  const dates: string[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  // Sync all dates (with rate limiting to avoid overwhelming the external site)
  for (const date of dates) {
    await syncDateAvailability(date);
    // Small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

