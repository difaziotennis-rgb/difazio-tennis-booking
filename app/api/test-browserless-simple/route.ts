import { NextResponse } from "next/server";

/**
 * Simple test to figure out the correct Browserless.io format
 */
export async function GET() {
  const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;
  const BROWSERLESS_URL = process.env.BROWSERLESS_URL || "https://chrome.browserless.io";

  if (!BROWSERLESS_API_KEY) {
    return NextResponse.json({ error: "API key not configured" });
  }

  const tests = [
    {
      name: "Test 1: module.exports format",
      code: `module.exports = async (page) => {
  return "test1";
};`
    },
    {
      name: "Test 2: arrow function format",
      code: `async (page) => {
  return "test2";
}`
    },
    {
      name: "Test 3: function expression",
      code: `(async (page) => {
  return "test3";
})`
    },
    {
      name: "Test 4: string eval",
      code: `return "test4";`
    }
  ];

  const results: any[] = [];

  for (const test of tests) {
    try {
      const response = await fetch(`${BROWSERLESS_URL}/function?token=${BROWSERLESS_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: test.code,
        }),
      });

      const status = response.status;
      const text = await response.text();
      
      results.push({
        name: test.name,
        status,
        ok: response.ok,
        response: text.substring(0, 200), // First 200 chars
        success: response.ok
      });
      
      // Stop at first success
      if (response.ok) {
        break;
      }
    } catch (error: any) {
      results.push({
        name: test.name,
        error: error.message,
        success: false
      });
    }
  }

  return NextResponse.json({
    tests: results,
    workingFormat: results.find(r => r.success)?.name || "None worked"
  });
}

