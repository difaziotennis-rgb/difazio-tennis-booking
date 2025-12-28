import { NextResponse } from "next/server";

/**
 * Simple test endpoint to check if Browserless is configured
 * This endpoint returns immediately without making any external calls
 */
export async function GET() {
  try {
    const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;
    const BROWSERLESS_URL = process.env.BROWSERLESS_URL || "https://chrome.browserless.io";
    
    const hasKey = !!BROWSERLESS_API_KEY;
    const keyLength = BROWSERLESS_API_KEY?.length || 0;
    const keyPrefix = hasKey ? BROWSERLESS_API_KEY.substring(0, 10) + "..." : "NOT_SET";
    
    return NextResponse.json({
      configured: hasKey,
      keyPrefix: keyPrefix,
      keyLength: keyLength,
      browserlessUrl: BROWSERLESS_URL,
      message: hasKey 
        ? "✅ Browserless API key is configured" 
        : "❌ Browserless API key is NOT configured",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: error.message,
        configured: false,
      },
      { status: 500 }
    );
  }
}

