# How to Test if Browserless is Working

## Current Status

Based on testing, your Browserless API key **IS configured** (the site is attempting to use it), but the requests are failing with a 400 error, which suggests a request format issue.

## Quick Test Methods

### Method 1: Test Production Endpoint (Easiest)

Visit this URL in your browser:
```
https://difaziotennis.com/api/check-court-availability?date=2025-01-15&hour=10
```

**What to look for:**
- ✅ **If you see**: `"source": "rhinebecktennis.com (Browserless.io)"` and `"available": true/false` → It's working!
- ⚠️ **If you see**: `"error": "Browserless request failed: 400"` → API key is set but request format needs fixing
- ❌ **If you see**: `"note": "Browserless.io not configured"` → API key is NOT set

### Method 2: Check Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: Settings → Environment Variables
4. Look for: `BROWSERLESS_API_KEY`
5. Verify:
   - ✅ It exists
   - ✅ Value is not empty
   - ✅ All environments are checked (Production, Preview, Development)

### Method 3: Check Browserless Dashboard

1. Go to: https://browserless.io/dashboard
2. Check your usage/activity logs
3. Look for recent requests from your site
4. If you see failed requests, they'll show error messages there

## Current Issue

The 400 error from Browserless typically means:
1. **Invalid API key format** - The key might be incorrect or expired
2. **Wrong endpoint URL** - The `/function` endpoint might need a different format
3. **Invalid request body** - The Puppeteer code format might be incorrect

## Next Steps

1. **Verify API key** in Browserless dashboard matches what's in Vercel
2. **Check Browserless logs** for specific error messages
3. **Test a simpler request** to verify the key works

Let me know what you find and I can help fix the issue!

