"use client";

import { ExternalLink } from "lucide-react";
import { Booking } from "@/lib/types";

interface VenmoPaymentProps {
  booking: Booking;
  onSuccess: () => void;
}

export function VenmoPayment({ booking, onSuccess }: VenmoPaymentProps) {
  // Get Venmo handle from payment settings
  const getVenmoHandle = (): string | null => {
    if (typeof window === "undefined") return null;
    
    try {
      const saved = localStorage.getItem("paymentSettings");
      if (saved) {
        const settings = JSON.parse(saved);
        return settings.venmoHandle || null;
      }
    } catch (e) {
      console.error("Error loading Venmo handle:", e);
    }
    return null;
  };

  const venmoHandle = getVenmoHandle();

  if (!venmoHandle) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        Venmo handle not configured. Please add your Venmo username in Payment Settings.
      </div>
    );
  }

  // Clean the handle (remove @ if present, remove spaces)
  const cleanHandle = venmoHandle.replace(/^@/, "").replace(/\s+/g, "");
  
  // Create Venmo payment link
  // Format: venmo.com/{username}?amount={amount}&note={note}
  const amount = booking.amount.toFixed(2);
  const note = `Tennis Lesson - ${new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} at ${booking.hour}:00`;
  
  // Encode the note for URL
  const encodedNote = encodeURIComponent(note);
  
  // Venmo link format
  const venmoUrl = `https://venmo.com/${cleanHandle}?amount=${amount}&note=${encodedNote}`;

  const handleVenmoClick = () => {
    // Open Venmo in new tab
    window.open(venmoUrl, "_blank");
    
    // Show instructions
    // After user pays, they can mark as paid manually or we can add webhook later
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary-50 rounded-lg p-4">
        <p className="text-sm text-earth-600 mb-2">
          Click the button below to open Venmo and complete your payment.
        </p>
        <div className="text-sm text-primary-800">
          <strong>Amount:</strong> ${amount}
        </div>
        <div className="text-sm text-primary-800">
          <strong>Note:</strong> {note}
        </div>
      </div>

      <button
        onClick={handleVenmoClick}
        className="w-full bg-[#3D95CE] hover:bg-[#2d7fb8] text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        style={{ backgroundColor: "#3D95CE" }}
      >
        <span>Pay with Venmo</span>
        <ExternalLink className="h-5 w-5" />
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        <p className="font-semibold mb-1">After paying:</p>
        <p>Your booking will be confirmed once payment is received. You'll receive a confirmation email.</p>
      </div>

      <button
        onClick={onSuccess}
        className="w-full border-2 border-primary-300 text-primary-700 font-medium py-3 px-4 rounded-lg hover:bg-primary-50 transition-colors"
      >
        I've completed the Venmo payment
      </button>
    </div>
  );
}

