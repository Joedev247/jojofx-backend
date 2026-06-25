# 🚀 Vercel Deployment Guide - JOJOFX Trading Bot Backend

## Pre-Deployment Checklist

✅ **Build Status**: All checks passed
- ✓ TypeScript compilation - No errors
- ✓ ESLint check - No errors (18 warnings for type improvements)
- ✓ Type checking - Successful
- ✓ Build verification - Successful

## Environment Variables Required

Before deploying to Vercel, ensure these environment variables are set in your Vercel project dashboard:

### Required Variables:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=production
```

### Optional Variables:
```
MT5_BRIDGE_URL=http://your-mt5-bridge-url
FOREXFACTORY_API_URL=https://www.forexfactory.com
```

## Architecture Overview

### Current Setup:
- **Framework**: Express.js
- **Language**: TypeScript
- **Runtime**: Node.js
- **Build Output**: `dist/` folder
- **Entry Point**: `dist/index.js`

## Step-by-Step Deployment

### 1. Connect Your Repository to Vercel
```bash
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub/GitLab repository
4. Select the "backend" folder as the root directory
```

### 2. Configure Build Settings
```
Build Command:     npm run build
Output Directory:  dist
Install Command:   npm install
```

### 3. Configure Environment Variables
```
1. In Vercel project settings, go to "Settings" → "Environment Variables"
2. Add all required variables listed above
3. Ensure variables are added to all environments (Production, Preview, Development)
```

### 4. Deploy
```
1. Click "Deploy" button
2. Wait for build to complete (typically 1-2 minutes)
3. Your API will be live at your Vercel URL
```

## Post-Deployment Testing

### Test These Endpoints:
- [ ] Health check: `GET /api/health`
- [ ] Create signal: `POST /api/signals`
- [ ] Get signals: `GET /api/signals`
- [ ] Get trades: `GET /api/trades`
- [ ] Get rules: `GET /api/rules`

### Example Health Check:
```bash
curl https://your-backend-url.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "JOJOFX Backend is running"
}
```

## CORS Configuration

The backend is configured with CORS enabled for all origins:
```javascript
app.use(cors())
```

For production, consider restricting CORS to your frontend domain:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app'
}))
```

## Frontend Integration

Update your frontend's API base URL to point to your Vercel backend:

**In frontend `.env.production`:**
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.vercel.app
```

## Database & Services Setup

### Supabase Configuration:
1. Ensure your Supabase project is set up
2. Create necessary tables (signals, trades, rules, etc.)
3. Configure RLS (Row Level Security) policies if needed
4. Add CORS headers for your Vercel backend domain

### MT5 Bridge (if used):
1. Ensure MT5 bridge service is running and accessible
2. Update `MT5_BRIDGE_URL` environment variable
3. Test connection via health endpoint

## Performance Monitoring

### Monitor Deployments:
1. Vercel Dashboard → Deployments
2. View build logs and function analytics
3. Monitor response times and errors

### Enable Analytics:
- Go to project settings
- Enable Web Analytics for performance monitoring
- Track API response times and error rates

## Troubleshooting

### Build Fails?
1. Check all required environment variables are set
2. Verify TypeScript compilation: `npm run build`
3. Check ESLint: `npm run lint`
4. Clear build cache and retry

### API Calls Fail?
1. Verify Supabase credentials are correct
2. Test health endpoint: `/api/health`
3. Check Supabase connection and permissions
4. Review Vercel function logs for errors

### CORS Issues?
1. Verify frontend domain is allowed
2. Check CORS configuration in app.ts
3. Ensure frontend sends proper headers
4. Test with curl first: `curl -H "Origin: https://your-frontend.com" https://your-backend.vercel.app/api/health`

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use service role key carefully** - Limit to server-side only
3. **Enable RLS on Supabase** - Restrict data access
4. **Validate all inputs** - Sanitize data on server
5. **Keep dependencies updated** - Run `npm audit`

## Continuous Deployment

After initial deployment:
1. Any push to your main branch automatically deploys
2. Pull requests create preview deployments
3. Monitor deployments in Vercel Dashboard
4. Rollback to previous version if issues occur

## Support & Rollback

### Rollback a Deployment:
1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "Rollback to this version"

### Monitor Logs:
1. Vercel Dashboard → Deployments
2. Click on deployment
3. View build and runtime logs
4. Check function execution details

## Next Steps

1. ✅ Commit changes to GitHub
2. ✅ Connect backend to Vercel
3. ✅ Set environment variables
4. ✅ Deploy
5. ✅ Test API endpoints
6. ✅ Update frontend API URL
7. ✅ Monitor performance

---

**Ready to Deploy?** 🎉  
Follow the steps above and your JOJOFX Trading Bot backend will be live!

For more help: https://vercel.com/docs/frameworks/express
