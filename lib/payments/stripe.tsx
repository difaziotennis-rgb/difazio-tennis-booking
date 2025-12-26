"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Booking } from "@/lib/types";

// Stripe Payment Link - Direct integration
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/14A5kD2SDeduaET9YD7N600";

// Stripe Payment Button Component - Uses Stripe Payment Link
export function StripePaymentButton({ booking, onSuccess, onError }: {
  booking: Booking;
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Create booking first
      onSuccess();
      
      // Small delay to ensure booking is saved
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Redirect directly to Stripe payment link
      window.location.href = STRIPE_PAYMENT_LINK;
    } catch (error: any) {
      setIsLoading(false);
      onError(error.message || "Payment failed. Please try again.");
    }
  };

  // ALWAYS RENDER THE BUTTON - NO CONDITIONALS
  return (
    <div className="w-full space-y-3 relative z-50" style={{ position: 'relative', zIndex: 50 }}>
      <button
        onClick={handleClick}
        disabled={isLoading}
        type="button"
        className="w-full px-6 py-5 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-[#5851EA] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative z-50"
        style={{ position: 'relative', zIndex: 50, cursor: 'pointer' }}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-lg">Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="h-6 w-6" />
            <span className="text-lg">Pay with Card</span>
          </>
        )}
      </button>
      
      <p className="text-xs text-earth-600 text-center">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}
