#!/bin/bash

# 🚀 Quick Deployment Script for Family Recipe Site
# This script helps you deploy your site to various platforms

echo "🍳 Family Recipe Site Deployment Helper"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the recipe-site directory"
    echo "   cd recipe-site && ./deploy.sh"
    exit 1
fi

# Build the site
echo "🔨 Building the site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check for errors above."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Show deployment options
echo "🌐 Choose your deployment platform:"
echo ""
echo "1. GitHub Pages (Free, automatic deployments)"
echo "2. Netlify (Free, great for forms)"
echo "3. Vercel (Free, excellent performance)"
echo "4. Manual upload (Upload dist/ folder)"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 GitHub Pages Deployment:"
        echo "=========================="
        echo ""
        echo "1. Push your code to GitHub:"
        echo "   git add ."
        echo "   git commit -m 'Deploy recipe site'"
        echo "   git push origin main"
        echo ""
        echo "2. Go to your repository on GitHub"
        echo "3. Click Settings → Pages"
        echo "4. Under 'Source', select 'GitHub Actions'"
        echo "5. The site will deploy automatically!"
        echo ""
        echo "Your site will be available at:"
        echo "https://your-username.github.io/recipe-site"
        echo ""
        ;;
    2)
        echo ""
        echo "🌐 Netlify Deployment:"
        echo "====================="
        echo ""
        echo "1. Go to https://netlify.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New site from Git'"
        echo "4. Select your repository"
        echo "5. Build settings (auto-detected):"
        echo "   - Build command: npm run build"
        echo "   - Publish directory: dist"
        echo "6. Click 'Deploy site'"
        echo ""
        echo "Your site will be available at:"
        echo "https://your-site-name.netlify.app"
        echo ""
        ;;
    3)
        echo ""
        echo "⚡ Vercel Deployment:"
        echo "===================="
        echo ""
        echo "1. Go to https://vercel.com"
        echo "2. Sign up/Login with GitHub"
        echo "3. Click 'New Project'"
        echo "4. Select your repository"
        echo "5. Build settings (auto-detected):"
        echo "   - Framework: Astro"
        echo "   - Build command: npm run build"
        echo "   - Output directory: dist"
        echo "6. Click 'Deploy'"
        echo ""
        echo "Your site will be available at:"
        echo "https://your-site-name.vercel.app"
        echo ""
        ;;
    4)
        echo ""
        echo "📁 Manual Upload:"
        echo "================="
        echo ""
        echo "Your built site is in the 'dist' folder."
        echo "You can upload this folder to any web hosting service."
        echo ""
        echo "Contents of dist folder:"
        ls -la dist/
        echo ""
        echo "Upload the entire contents of the dist/ folder to your web host."
        echo ""
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo "🎉 Deployment instructions complete!"
echo ""
echo "📋 Next steps:"
echo "1. Follow the instructions above for your chosen platform"
echo "2. Test your deployed site"
echo "3. Share the URL with your family!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "Happy cooking! 🍳✨"
