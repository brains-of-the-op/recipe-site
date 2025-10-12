# 🚀 Deployment Guide

This guide will help you deploy your recipe website to various platforms. Choose the option that works best for you!

## 📋 Prerequisites

1. **GitHub Account** (for all options)
2. **Node.js** installed locally (for testing)
3. **Your website code** pushed to a GitHub repository

## 🎯 Quick Start - Choose Your Platform

### Option 1: GitHub Pages (Free & Easy) ⭐ **RECOMMENDED**
- ✅ **Free forever**
- ✅ **Automatic deployments**
- ✅ **Custom domain support**
- ✅ **Perfect for family recipe sites**

### Option 2: Netlify (Free & Powerful)
- ✅ **Free tier available**
- ✅ **Form handling built-in**
- ✅ **Great for GitHub integration**
- ✅ **Automatic deployments**

### Option 3: Vercel (Free & Fast)
- ✅ **Free tier available**
- ✅ **Excellent performance**
- ✅ **Easy GitHub integration**
- ✅ **Automatic deployments**

---

## 🚀 Option 1: Deploy to GitHub Pages

### Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   cd recipe-site
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Update your Astro config** (already done!):
   - Open `astro.config.mjs`
   - Replace `your-username` with your actual GitHub username
   - Update the `base` path if needed

### Step 2: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click "Settings" tab**
3. **Scroll to "Pages" section**
4. **Under "Source":**
   - Select "GitHub Actions"
5. **Save the settings**

### Step 3: Deploy!

1. **The GitHub Action will run automatically** when you push to main
2. **Your site will be available at:**
   ```
   https://your-username.github.io/recipe-site
   ```

### Step 4: Custom Domain (Optional)

1. **In GitHub Pages settings:**
   - Add your custom domain (e.g., `recipes.yourfamily.com`)
2. **Update your Astro config:**
   ```javascript
   site: 'https://recipes.yourfamily.com'
   base: '/'
   ```

---

## 🌐 Option 2: Deploy to Netlify

### Step 1: Connect to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login with GitHub**
3. **Click "New site from Git"**
4. **Select your repository**

### Step 2: Configure Build Settings

Netlify will auto-detect your settings, but verify:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** `recipe-site` (if deploying from root)

### Step 3: Deploy!

1. **Click "Deploy site"**
2. **Your site will be available at:**
   ```
   https://your-site-name.netlify.app
   ```

### Step 4: Environment Variables (for GitHub API)

If you want to use the private GitHub integration:

1. **Go to Site settings → Environment variables**
2. **Add:**
   ```
   GITHUB_TOKEN=your_github_token_here
   GITHUB_OWNER=your_github_username
   GITHUB_REPO=your_repo_name
   ```

---

## ⚡ Option 3: Deploy to Vercel

### Step 1: Connect to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Select your repository**

### Step 2: Configure Project

Vercel will auto-detect your settings:
- **Framework:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`

### Step 3: Deploy!

1. **Click "Deploy"**
2. **Your site will be available at:**
   ```
   https://your-site-name.vercel.app
   ```

---

## 🧪 Test Your Deployment

After deploying, test these features:

### ✅ Basic Functionality
- [ ] Home page loads
- [ ] Recipe pages work
- [ ] Navigation works
- [ ] Mobile responsive

### ✅ GitHub Integration
- [ ] "Share cooking tips" form works
- [ ] "Document favorite recipes" form works
- [ ] Submissions create GitHub issues

### ✅ Performance
- [ ] Pages load quickly
- [ ] Images display properly
- [ ] CSS styles apply correctly

---

## 🔧 Troubleshooting

### Common Issues

#### "Site not found" Error
- **Check your base URL** in `astro.config.mjs`
- **Verify your repository name** matches the URL
- **Wait a few minutes** for deployment to complete

#### GitHub Integration Not Working
- **Check your GitHub token** (if using private integration)
- **Verify repository permissions**
- **Test the API endpoints** manually

#### Styling Issues
- **Clear your browser cache**
- **Check CSS file paths** in the built site
- **Verify asset URLs** are correct

### Getting Help

1. **Check the browser console** for JavaScript errors
2. **Look at the Network tab** for failed requests
3. **Review the deployment logs** on your platform
4. **Test locally first** with `npm run build && npm run preview`

---

## 🎉 Success!

Once deployed, your family can:

- **View recipes** on any device
- **Submit new recipes** through the forms
- **Share cooking tips** automatically
- **Plan meals together** using the planning features

## 🔄 Updating Your Site

To update your deployed site:

1. **Make changes** to your local files
2. **Test locally** with `npm run dev`
3. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update recipes"
   git push origin main
   ```
4. **Your site updates automatically!**

---

## 📱 Mobile Optimization

Your site is already mobile-optimized, but you can enhance it further:

### Add to Home Screen (PWA)
Add this to your `public/` folder for app-like experience:

```html
<!-- public/manifest.json -->
{
  "name": "Family Recipe Site",
  "short_name": "Recipes",
  "description": "Our family's digital cookbook",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ff6b6b",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

---

**Happy Cooking! 🍳✨**

*Your family recipe site is now live and ready to share!*
