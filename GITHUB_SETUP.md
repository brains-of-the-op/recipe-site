# 🚀 GitHub API Integration Setup

This guide will help you set up the GitHub API integration so your family can submit recipes and tips that create GitHub issues!

## 🎯 Two Options Available

### Option 1: Public Integration (Recommended for Families)
- **No GitHub token required** - Works immediately
- **Family submits form** → **Redirects to GitHub** → **They complete submission**
- **Secure** - No sensitive credentials needed
- **Easy setup** - Just works!

### Option 2: Private Integration (Advanced)
- **Requires GitHub token** - More setup needed
- **Family submits form** → **Automatically creates GitHub issue**
- **Seamless** - No redirect needed
- **Requires hosting platform** with environment variables

## 📋 Prerequisites

- A GitHub account
- A repository for your recipe site (this one!)
- Admin access to the repository

---

# 🎯 Option 1: Public Integration (Recommended)

**This option works immediately with no setup required!**

## ✅ How It Works

1. **Family member fills out form** on your recipe site
2. **Form data is processed** and formatted
3. **User is redirected to GitHub** with pre-filled issue
4. **User completes submission** on GitHub
5. **You get notified** of the new issue

## 🚀 Setup (It's Already Done!)

The public integration is already configured in your site! No additional setup needed.

## 🧪 Test It

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Test a submission**
   - Go to `http://localhost:4321`
   - Click on any hero feature (e.g., "Share cooking tips")
   - Fill out the form and submit
   - You'll be redirected to GitHub to complete the submission!

---

# 🔑 Option 2: Private Integration (Advanced)

**This option requires a GitHub token but provides seamless automation.**

## 🔑 Step 1: Create a GitHub Personal Access Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"

2. **Configure the Token**
   - **Note**: `Recipe Site API Token`
   - **Expiration**: Choose your preference (90 days, 1 year, or no expiration)
   - **Scopes**: Check `repo` (Full control of private repositories)

3. **Generate and Copy**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately - you won't see it again!

## 🌍 Step 2: Set Environment Variables

Create a `.env` file in your project root with:

```env
# GitHub API Configuration
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_OWNER=brains-of-the-op
GITHUB_REPO=tihwdi-replies
```

**Replace the values:**
- `your_github_personal_access_token_here` → Your actual token from Step 1
- `brains-of-the-op` → Repository owner (already correct)
- `tihwdi-replies` → Repository name (already correct)

## 🔒 Step 3: Secure Your Token

**Never commit your `.env` file to GitHub!**

Make sure `.env` is in your `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.production
```

## 🧪 Step 4: Test the Integration

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Test a submission**
   - Go to `http://localhost:4321`
   - Click on any hero feature (e.g., "Share cooking tips")
   - Fill out the form and submit
   - Check your GitHub repository for a new issue!

## 🎯 What Happens When Someone Submits

### Recipe Submission
- Creates a GitHub issue with the recipe details
- Formats ingredients and instructions nicely
- Adds labels: `recipe`, `new-content`
- Includes submitter's name

### Tip Submission
- Creates a GitHub issue with the cooking tip
- Categorizes the tip appropriately
- Adds labels: `tip`, `new-content`
- Ready for review and addition to tips page

### Planning Submission
- Creates a GitHub issue for meal planning
- Includes date and event details
- Adds labels: `planning`, `family-coordination`
- Perfect for family coordination

### Feedback Submission
- Creates a GitHub issue for feedback
- Categorizes by type (recipe feedback, site improvement, etc.)
- Adds labels: `feedback`, `improvement`
- Helps improve the site

## 🔧 Troubleshooting

### "GitHub token not configured" Error
- Make sure your `.env` file exists and has the correct token
- Restart your development server after adding the `.env` file
- Check that the token has `repo` permissions

### "Failed to create GitHub issue" Error
- Verify your GitHub username and repository name are correct
- Check that the token hasn't expired
- Make sure the repository exists and you have access

### Issues Not Appearing
- Check your GitHub repository's Issues tab
- Verify the token has the correct permissions
- Look at the browser console for error messages

## 🎉 You're All Set!

Once configured, your family can:
- Submit recipes that create GitHub issues
- Share cooking tips automatically
- Plan meals and events together
- Give feedback on recipes and the site

All submissions will appear as GitHub issues that you can review, discuss, and implement!

## 🔄 Next Steps

After setting up the API integration, you might want to:
1. **Set up GitHub Actions** to automatically create recipe files from approved issues
2. **Add email notifications** when new issues are created
3. **Create issue templates** for better organization
4. **Set up automatic labeling** based on submission type

Happy cooking! 🍳✨
