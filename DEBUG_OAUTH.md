# Debug OAuth Redirect Issue

## Current Status
✅ Environment variable `NEXT_PUBLIC_APP_URL` = `https://kisah-sukses-pmi.vercel.app`
✅ `getUrl()` function returns correct URL
✅ `getLoginRedirectPath()` generates correct redirect URL
❌ Google OAuth still redirects to `localhost:3000`

## Root Cause Analysis
The issue is NOT in the Next.js application code. The redirect is happening at Google/Supabase level.

## Immediate Action Required

### 1. Google Cloud Console Check
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Navigate to **APIs & Services** → **Credentials**
- [ ] Select your OAuth 2.0 Client ID
- [ ] **Authorized redirect URIs** should ONLY contain:
  ```
  https://imdfhpojkvvyffenxbgf.supabase.co/auth/v1/callback
  ```
- [ ] **REMOVE** any URLs containing `localhost` or `127.0.0.1`
- [ ] Click **Save**

### 2. Supabase Dashboard Check
- [ ] Go to [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] Select project: `imdfhpojkvvyffenxbgf`
- [ ] **Settings** → **General**
- [ ] **Site URL**: `https://kisah-sukses-pmi.vercel.app`
- [ ] **Redirect URLs**: `https://kisah-sukses-pmi.vercel.app/**`
- [ ] **Authentication** → **Providers** → **Google**
- [ ] Verify Client ID and Client Secret are correct

### 3. Browser Test
- [ ] Clear browser cache
- [ ] Open incognito/private window
- [ ] Test login again

## Expected Logs
After fixes, you should see in browser console:
```
🔍 Auth Callback - requestUrl: https://kisah-sukses-pmi.vercel.app/auth/callback?code=...
🔍 Auth Callback - redirectPath: /
🔍 Auth Callback - baseUrl: https://kisah-sukses-pmi.vercel.app
```

## If Still Not Working
1. Try creating a new OAuth Client ID in Google Cloud
2. Update Supabase with the new Client ID/Secret
3. Contact Supabase support if issue persists

