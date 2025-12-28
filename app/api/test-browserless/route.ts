import { NextResponse } from "next/server";

/**
 * Test endpoint to verify Browserless API key is configured
 */
export async function GET() {
  try {
    const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;
    const BROWSERLESS_URL = process.env.BROWSERLESS_URL || "https://chrome.browserless.io";
    
    const hasKey = !!BROWSERLESS_API_KEY;
    const keyLength = BROWSERLESS_API_KEY?.length || 0;
    const keyPrefix = BROWSERLESS_API_KEY?.substring(0, 10) || "NOT_SET";
    
    // Try to test the Browserless connection
    let connectionTest = "not_tested";
    let connectionError = null;
    
    if (hasKey) {
      try {
        // Simple test - try to access Browserless with a minimal request
        const testResponse = await fetch(`${BROWSERLESS_URL}/function?token=${BROWSERLESS_API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: `
              return JSON.stringify({
                success: true,
                message: "Browserless connection successful"
              });
            `,
          }),
          // Set a short timeout to avoid hanging
          signal: AbortSignal.timeout(5000),
        });
        
        if (testResponse.ok) {
          connectionTest = "success";
        } else {
          connectionTest = "failed";
          connectionError = `Status: ${testResponse.status}`;
        }
      } catch (error: any) {
        connectionTest = "error";
        connectionError = error.message;
      }
    }
    
    return NextResponse.json({
      configured: hasKey,
      keyPrefix: hasKey ? `${keyPrefix}...` : "NOT_SET",
      keyLength,
      browserlessUrl: BROWSERLESS_URL,
      connectionTest,
      connectionError,
      message: hasKey 
        ? "✅ Browserless API key is configured" 
        : "❌ Browserless API key is NOT configured",
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

