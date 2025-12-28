# How to Check if /function Endpoint is Available on Your Browserless Plan

## Step 1: Log into Browserless Dashboard

1. Go to: **https://browserless.io**
2. Click **"Sign In"** or **"Dashboard"** (top right)
3. Log in with your account credentials

## Step 2: Check Your Plan Details

Once logged in:

1. Look for:
   - **"Plan"** or **"Subscription"** section
   - **"Usage"** or **"Billing"** section
   - **Dashboard sidebar** → Click on your plan/account

2. You should see:
   - Your current plan (Free, Starter, Pro, etc.)
   - Available features/endpoints
   - Usage limits

## Step 3: Check Available Endpoints

Look for information about:
- **Available API endpoints**
- **Supported features**
- **Endpoint list** or **API documentation**

Common locations:
- **"Features"** or **"Capabilities"** section
- **"API Documentation"** link
- **"Endpoints"** section in dashboard
- **"Plan Comparison"** page

## Step 4: Check Documentation

1. Go to: **https://docs.browserless.io**
2. Look for: **"Function Endpoint"** or **"/function"** in the navigation
3. Check if it mentions:
   - Which plans support it
   - Any restrictions
   - Free tier availability

## Step 5: Check Your API Key/Token

1. In Browserless dashboard, go to:
   - **"API Keys"** or **"Tokens"** section
   - **"Settings"** → **"API"**
   - **"Credentials"** section

2. Check for:
   - Available endpoints listed with your key
   - Usage statistics (might show which endpoints you've used)
   - Feature flags or enabled features

## What to Look For

### ✅ If `/function` is Available:
- Should see "/function" in endpoints list
- Documentation will show it's supported
- You should be able to use it

### ❌ If `/function` is NOT Available:
- Won't appear in available endpoints
- Documentation might say "Pro plan only" or "Paid plans only"
- You'll need to upgrade or use alternative endpoints

## Alternative: Check Via API

You can also test if the endpoint works:

1. **Try the minimal test endpoint we created**:
   - Visit: `https://difaziotennis.com/api/test-browserless-minimal`
   - After deployment, this will try the simplest possible code
   - If it works, the endpoint is available
   - If it fails with "code is not a function", it might not be supported

2. **Check Browserless logs**:
   - In dashboard, look for "Activity" or "Logs"
   - See what errors appear when we try to use `/function`
   - Error messages might tell you if endpoint is unavailable

## Quick Test URLs

After the deployment completes, you can test:

1. **Minimal test**: `https://difaziotennis.com/api/test-browserless-minimal`
2. **Full diagnostics**: `https://difaziotennis.com/debug-browserless`

## Common Plan Restrictions

Based on typical SaaS patterns:
- **Free tier**: Often limited to basic endpoints (screenshot, content)
- **Paid plans**: Usually include advanced endpoints like `/function`
- **Enterprise**: Full access to all endpoints

## If `/function` Isn't Available

Options:
1. **Upgrade plan** (if affordable)
2. **Use alternative endpoints** (screenshot, content, etc.)
3. **Manual availability management** (your site already supports this!)
4. **Find Wix API** (best long-term solution - direct API calls)

## Need Help?

If you can't find this information:
1. Check Browserless support/help docs
2. Contact Browserless support
3. Check their pricing page for feature comparisons
4. Look at your account's "Usage" section - it might show which endpoints you can use

