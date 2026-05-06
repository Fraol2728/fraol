# Deployment Guide

## Vercel Environment Variables
Add these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Environment |
|---|---|---|
| NEXT_PUBLIC_SANITY_PROJECT_ID | your_project_id | All |
| NEXT_PUBLIC_SANITY_DATASET | production | All |
| NEXT_PUBLIC_SANITY_API_VERSION | 2024-01-01 | All |
| SANITY_API_READ_TOKEN | your_token | All |
| SANITY_API_WRITE_TOKEN | your_token | All |
| NEXT_PUBLIC_SITE_URL | https://yourdomain.com | Production |
| NEXT_PUBLIC_SITE_NAME | Your Name | All |
| NEXT_PUBLIC_SITE_EMAIL | your@email.com | All |

## Steps to Deploy
1. Push code to GitHub
2. Import repo in Vercel
3. Add all env variables above
4. Deploy
5. Update NEXT_PUBLIC_SITE_URL to your Vercel URL
6. Update Sanity CORS origins to include your Vercel URL:
   Go to sanity.io/manage → your project → API → CORS origins
   Add: https://yourdomain.vercel.app

## Post-deploy
- Update liveUrl in your Project document in Sanity Studio
- Test all routes on production URL
- Run Lighthouse audit on production
