# Deployment Checklist

## Pre-Deployment Tasks

### 1. Environment Setup
- [ ] Create Neon PostgreSQL database
- [ ] Get Neon connection string
- [ ] Sign up for Resend account
- [ ] Verify domain (earesearch.net) in Resend
- [ ] Get Resend API key
- [ ] Set admin password

### 2. Local Testing
- [ ] Create `.env.local` with all variables
- [ ] Run `npm run db:generate` to create migrations
- [ ] Run `npm run db:push` to create tables
- [ ] Test development server: `npm run dev`
- [ ] Test all admin forms (add test content)
- [ ] Verify email notifications work
- [ ] Test contact form submission
- [ ] Check all public pages render correctly
- [ ] Test API endpoints with Postman/curl

### 3. Code Quality
- [ ] Run `npm run lint` - fix any errors
- [ ] Run `npm run build` - ensure no build errors
- [ ] Review TypeScript errors: `npx tsc --noEmit`
- [ ] Test production build locally: `npm start`

## Netlify Deployment

### 4. Initial Setup
- [ ] Install Netlify CLI: `npm install -g netlify-cli`
- [ ] Login to Netlify: `netlify login`
- [ ] Initialize site: `netlify init`
  - Choose "Create & configure a new site"
  - Select your team
  - Site name: `earesearch` (or custom)
  - Build command: `npm run build`
  - Publish directory: `.next`

### 5. Environment Variables
Set in Netlify dashboard (Site settings > Environment variables):
```bash
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
RESEND_API_KEY=re_your_api_key_here
ADMIN_PASSWORD=your_secure_production_password
NEXT_PUBLIC_SITE_URL=https://earesearch.net
REVALIDATE_SECRET=random_secret_string_here
```

Or via CLI:
```bash
netlify env:set DATABASE_URL "postgresql://..."
netlify env:set RESEND_API_KEY "re_..."
netlify env:set ADMIN_PASSWORD "..."
netlify env:set NEXT_PUBLIC_SITE_URL "https://earesearch.net"
netlify env:set REVALIDATE_SECRET "..."
```

### 6. Deploy
```bash
# Deploy to production
netlify deploy --prod

# Note the deployment URL
# Example: https://earesearch.netlify.app
```

### 7. Database Migration on Production
After successful deployment:
```bash
# Ensure DATABASE_URL is set to production database
# Run migrations
npm run db:push
```

Verify tables created:
```bash
# Open Drizzle Studio connected to production
npm run db:studio
```

### 8. Domain Configuration
- [ ] Add custom domain in Netlify: earesearch.net
- [ ] Configure DNS records:
  - Add Netlify's DNS servers, or
  - Add CNAME record: `earesearch.net` → `your-site.netlify.app`
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Wait for DNS propagation (can take 24-48 hours)

## Post-Deployment Verification

### 9. Site Testing
- [ ] Visit production URL
- [ ] Test all page navigation
- [ ] Verify home page loads correctly
- [ ] Check publications page (should show empty states)
- [ ] Test prototypes page
- [ ] Check research themes pages
- [ ] Test datasets pages
- [ ] Verify updates/blog pages
- [ ] Check partners page (Addis AI section)
- [ ] Test contact form submission
- [ ] Verify email notification received at emmanuel@earesearch.net

### 10. Admin Forms Testing
- [ ] Access `/admin/publications/library/new`
- [ ] Add a test external paper
- [ ] Verify it appears in publications library tab
- [ ] Test working papers form
- [ ] Test literature reviews form
- [ ] Test social posts form
- [ ] Test artifacts form (with YouTube embed)
- [ ] Test prototypes form
- [ ] Delete test content or mark as drafts

### 11. API Endpoints
Test all endpoints are working:
```bash
# Library
curl https://earesearch.net/api/publications/library

# Working papers
curl https://earesearch.net/api/publications/working

# Reviews
curl https://earesearch.net/api/publications/reviews

# Social posts
curl https://earesearch.net/api/publications/social

# Artifacts
curl https://earesearch.net/api/publications/artifacts

# Prototypes
curl https://earesearch.net/api/prototypes

# Contact (POST only - test via form)
```

### 12. SEO & Metadata
- [ ] Check page titles in browser tabs
- [ ] Verify meta descriptions (View Page Source)
- [ ] Test OpenGraph preview (LinkedIn, Twitter card validator)
- [ ] Submit sitemap.xml to Google Search Console (future)
- [ ] Verify robots.txt is accessible

## Security & Performance

### 13. Security Hardening
- [ ] Implement admin authentication (see README)
- [ ] Test admin routes are protected
- [ ] Verify API POST endpoints require auth
- [ ] Enable rate limiting (Netlify Edge Functions)
- [ ] Review CORS settings
- [ ] Set security headers in netlify.toml

### 14. Performance Optimization
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check Core Web Vitals
- [ ] Verify images are optimized (Next.js Image)
- [ ] Test page load times
- [ ] Enable caching headers
- [ ] Configure ISR (Incremental Static Regeneration)

### 15. Monitoring & Analytics
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure analytics (Plausible, Google Analytics)
- [ ] Set up uptime monitoring (Uptime Robot, Checkly)
- [ ] Enable Netlify Analytics (optional)

## Content Population

### 16. Add Real Content
- [ ] Add real external papers to library
- [ ] Upload working papers with PDFs
- [ ] Create literature reviews
- [ ] Link social media posts
- [ ] Upload research artifacts (videos, interviews)
- [ ] Add prototypes with demo links
- [ ] Create research theme MDX files
- [ ] Add dataset information
- [ ] Write updates/blog posts

### 17. Review & Polish
- [ ] Proofread all content
- [ ] Check for broken links
- [ ] Verify all images load
- [ ] Test mobile responsiveness
- [ ] Check accessibility (WAVE tool)
- [ ] Get feedback from team members

## Maintenance

### 18. Ongoing Tasks
- [ ] Regular database backups (Neon automatic)
- [ ] Monitor error logs (Netlify Functions logs)
- [ ] Update dependencies monthly: `npm update`
- [ ] Review and respond to contact form submissions
- [ ] Add new content regularly
- [ ] Monitor site performance
- [ ] Review and update SEO metadata

## Troubleshooting

### Common Issues

**Build Fails on Netlify**
- Check build logs for specific error
- Verify all dependencies in package.json
- Ensure Node version matches (.nvmrc: 20)
- Check environment variables are set

**Database Connection Errors**
- Verify DATABASE_URL is correct
- Check Neon database is active
- Ensure sslmode=require in connection string
- Test connection locally first

**Email Not Sending**
- Verify RESEND_API_KEY is set
- Check domain is verified in Resend
- Review Resend dashboard logs
- Test with personal email first

**Admin Forms Not Working**
- Check API endpoint responses in Network tab
- Verify database tables exist
- Check for TypeScript/validation errors
- Review server logs in Netlify

**Content Not Displaying**
- Check API endpoints return data
- Verify database contains records
- Check for CORS issues
- Review browser console for errors

## Support

For issues or questions:
- Review README.md and DATABASE.md
- Check Netlify deployment logs
- Review Neon database logs
- Test API endpoints with curl
- Check browser console and network tab

---

**Deployment Date**: _____________  
**Deployed By**: _____________  
**Production URL**: https://earesearch.net  
**Admin Access**: /admin/publications/library/new (add auth before use)
