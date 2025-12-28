# Browserless Debugging Guide

## Quick Test

Once deployed, visit:
**https://difaziotennis.com/debug-browserless**

This page will run comprehensive diagnostics and show you exactly what's wrong.

## Manual Checks

### 1. Check Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: **Settings** → **Environment Variables**
4. Look for: `BROWSERLESS_API_KEY`
5. Verify:
   - ✅ It exists
   - ✅ Value is not empty
   - ✅ All environments checked (Production, Preview, Development)
   - ✅ Matches your Browserless dashboard key (no extra spaces)

### 2. Check Browserless Dashboard

1. Go to: https://browserless.io/dashboard
2. Check:
   - **API Key**: Copy this and verify it matches Vercel
   - **Usage/Activity Logs**: Look for failed requests
   - **Error Messages**: These will tell you exactly what's wrong

### 3. Check Vercel Logs

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: **Logs** tab
4. Look for:
   - Browserless error messages
   - API endpoint errors
   - Timeout errors

### 4. Test API Endpoints Directly

#### Test Configuration:
```bash
curl https://difaziotennis.com/api/test-browserless-config
```

#### Test Full Diagnostics:
```bash
curl https://difaziotennis.com/api/debug-browserless
```

#### Test Court Availability Check:
```bash
curl "https://difaziotennis.com/api/check-court-availability?date=2025-01-15&hour=10"
```

## Common Errors and Solutions

### Error: "Browserless API key not configured"
**Solution**: Add `BROWSERLESS_API_KEY` to Vercel environment variables and redeploy

### Error: "Browserless request failed: 400"
**Possible Causes**:
- Invalid API key format
- Wrong request format
- API key doesn't have required permissions

**Solutions**:
1. Check Browserless dashboard logs for specific error
2. Verify API key matches Browserless dashboard exactly
3. Check if API key is expired or revoked

### Error: "Browserless request failed: 401" or "403"
**Solution**: Your API key is invalid or expired. Get a new one from Browserless dashboard

### Error: "Browserless request timed out"
**Solution**: The request is taking too long. This might mean:
- Browserless service is slow/down
- The Puppeteer script is too complex
- Network issues

## What the Diagnostics Show

The debug page checks:
1. ✅ Environment variables are set
2. ✅ Browserless API connectivity
3. ✅ API key validity
4. ✅ Court availability endpoint functionality

## Still Having Issues?

1. Run the diagnostics page: `/debug-browserless`
2. Check Browserless dashboard logs for specific errors
3. Verify API key in both Vercel and Browserless dashboard match exactly
4. Check Vercel logs for runtime errors
5. Try regenerating your Browserless API key

