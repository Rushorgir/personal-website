# GitHub Pages Deployment Guide for Rushaan's Portfolio

This guide will help you deploy your React portfolio to GitHub Pages and connect it to your custom domain `rushorgir.me`.

## Prerequisites

- GitHub account
- Git installed locally
- Your custom domain `rushorgir.me` ready to configure

## Step 1: Prepare Your Repository

1. Create a new repository on GitHub named `rushaan.github.io` (or any name you prefer)
2. Make sure the repository is public

## Step 2: Install GitHub Pages Package

```bash
cd /app/frontend
yarn add gh-pages
```

## Step 3: Update package.json

Add the following to your `/app/frontend/package.json`:

```json
{
  "homepage": "https://rushorgir.me",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

Note: If you haven't configured your custom domain yet, temporarily use:
```json
"homepage": "https://your-username.github.io/your-repo-name"
```

## Step 4: Create a Production Build

Since your portfolio is static (no backend needed), we need to ensure the build works:

```bash
cd /app/frontend
yarn build
```

This creates an optimized production build in the `build/` folder.

## Step 5: Deploy to GitHub Pages

```bash
cd /app/frontend
yarn deploy
```

This will:
1. Build your app
2. Create/update the `gh-pages` branch
3. Push the built files to GitHub

## Step 6: Configure GitHub Repository Settings

1. Go to your GitHub repository
2. Click "Settings" > "Pages"
3. Under "Source", select branch `gh-pages` and folder `/ (root)`
4. Click "Save"

## Step 7: Configure Custom Domain

### Option A: Using GitHub's Custom Domain Setting

1. In GitHub repository Settings > Pages
2. Under "Custom domain", enter: `rushorgir.me`
3. Click "Save"
4. Check "Enforce HTTPS" (wait for certificate to provision)

### Option B: Using CNAME File

Create a file `/app/frontend/public/CNAME` with:
```
rushorgir.me
```

Then redeploy:
```bash
yarn deploy
```

## Step 8: Configure DNS Settings

Go to your domain registrar (where you bought rushorgir.me) and add these DNS records:

### For Apex Domain (rushorgir.me):

Add these A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### For WWW Subdomain (optional):

Add a CNAME record:
```
www.rushorgir.me -> your-username.github.io
```

**Note:** DNS changes can take 24-48 hours to propagate.

## Step 9: Verify Deployment

After DNS propagation, visit:
- `https://rushorgir.me` - Your live site
- `https://your-username.github.io/repo-name` - Alternative GitHub URL

## Updating Your Portfolio

Whenever you make changes:

1. Make your code changes locally
2. Run `yarn deploy` from `/app/frontend`
3. Wait 1-2 minutes for GitHub Pages to update

## Important Notes for Static Deployment

### Router Configuration

Your portfolio uses React Router. For GitHub Pages, you need to handle client-side routing:

1. The current setup works because we're using hash-free routing
2. GitHub Pages will serve `index.html` for the root path
3. Since it's a single-page app with scroll-based navigation, it should work fine

### Environment Variables

If you need to use environment variables in production:

1. Create `/app/frontend/.env.production`:
```
REACT_APP_SITE_URL=https://rushorgir.me
```

2. Access in code:
```javascript
const siteUrl = process.env.REACT_APP_SITE_URL;
```

## Troubleshooting

### Issue: 404 Error on Custom Domain

**Solution:** Check DNS settings and wait for propagation. Use [WhatsMyDNS](https://www.whatsmydns.net/) to verify.

### Issue: Site Not Updating

**Solution:** 
- Clear browser cache (Ctrl+Shift+R)
- Check that `yarn deploy` completed successfully
- Verify gh-pages branch was updated on GitHub

### Issue: CSS or Images Not Loading

**Solution:** 
- Verify `homepage` in package.json is correct
- Check browser console for 404 errors
- Ensure all asset paths are relative (starting with `./` or `/`)

### Issue: Three.js 3D Element Not Rendering

**Solution:**
- Check browser console for WebGL errors
- Verify Three.js is included in production build
- Test in different browsers

## Development vs Production

### Local Development:
```bash
cd /app/frontend
yarn start
```
Runs on http://localhost:3000

### Production Build:
```bash
cd /app/frontend
yarn build
```
Creates optimized production build

### Deploy to GitHub Pages:
```bash
cd /app/frontend
yarn deploy
```

## SEO Optimization for GitHub Pages

Create `/app/frontend/public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://rushorgir.me/sitemap.xml
```

Create `/app/frontend/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rushorgir.me</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update `/app/frontend/public/index.html` meta tags:
```html
<meta name="description" content="Rushaan Nayyar - AI/ML Developer & Computer Science Student at VIT Chennai. Portfolio showcasing Python projects and machine learning expertise.">
<meta name="keywords" content="AI, ML, Machine Learning, Python, Developer, Computer Science, Portfolio">
<meta property="og:title" content="Rushaan Nayyar - AI/ML Developer">
<meta property="og:description" content="AI/ML Developer & Computer Science Student specializing in Python projects and machine learning.">
<meta property="og:url" content="https://rushorgir.me">
<meta name="twitter:card" content="summary_large_image">
```

## Performance Optimization

Your portfolio already includes:
- Framer Motion for smooth animations
- Three.js for 3D graphics
- Lazy loading for images (via intersection observer)

For additional optimization:
```bash
cd /app/frontend
yarn build
# Check build size in build folder
```

## Contact & Support

If you encounter issues:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages documentation: https://docs.github.com/en/pages
3. Test locally first with `yarn build && npx serve -s build`

---

**Your portfolio is now ready to be deployed to GitHub Pages!**

Good luck with your portfolio and your journey as an AI/ML developer!
