# 🛡️ Branch Protection Setup Guide

## Setting up Pull Request Workflows

To enable proper PR previews and testing, you'll need to configure branch protection rules on GitHub.

### Step 1: Go to Repository Settings
1. Navigate to your repository: `https://github.com/brains-of-the-op/recipe-site`
2. Click **Settings** tab
3. Click **Branches** in the left sidebar

### Step 2: Add Branch Protection Rule
1. Click **Add rule** or **Add branch protection rule**
2. In **Branch name pattern**, enter: `main`
3. Configure the following settings:

#### ✅ Required Settings:
- [ ] **Require a pull request before merging**
  - [ ] Require approvals: `1` (or more)
  - [ ] Dismiss stale PR approvals when new commits are pushed
  - [ ] Require review from code owners (if you have a CODEOWNERS file)

- [ ] **Require status checks to pass before merging**
  - [ ] Require branches to be up to date before merging
  - Add these required status checks:
    - `build` (from deploy.yml)
    - `build-and-preview` (from pr-preview.yml)

- [ ] **Require conversation resolution before merging**
- [ ] **Restrict pushes that create files larger than 100 MB**

#### 🔧 Optional but Recommended:
- [ ] **Require signed commits**
- [ ] **Require linear history**
- [ ] **Include administrators** (applies rules to repo admins too)

### Step 3: Save Settings
Click **Create** or **Save changes**

## 🚀 How PR Workflows Work

### For Contributors:
1. **Create a feature branch:**
   ```bash
   git checkout -b feature/calendar-integration
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "Add calendar integration"
   git push origin feature/calendar-integration
   ```

3. **Create a Pull Request:**
   - Go to GitHub and click "New Pull Request"
   - The PR template will guide you through testing
   - GitHub Actions will automatically:
     - Build your changes
     - Deploy a preview
     - Add a comment with preview link
     - Run status checks

4. **Test the preview:**
   - Click the preview link in the PR comment
   - Test all functionality
   - Update the PR checklist

5. **Get approval and merge:**
   - Request review from maintainers
   - Address any feedback
   - Merge when approved

### For Maintainers:
1. **Review the PR:**
   - Check the preview deployment
   - Review code changes
   - Test functionality
   - Approve if everything looks good

2. **Merge the PR:**
   - All status checks must pass
   - At least one approval required
   - Merge to main branch

3. **Automatic deployment:**
   - Main branch changes deploy automatically
   - Preview deployments are cleaned up

## 🔧 Workflow Files Explained

### `.github/workflows/deploy.yml`
- **Purpose:** Deploy to production (main branch only)
- **Triggers:** Push to main, manual dispatch
- **Result:** Live site at GitHub Pages

### `.github/workflows/pr-preview.yml`
- **Purpose:** Create preview deployments for PRs
- **Triggers:** Pull requests to main
- **Result:** Temporary preview site + PR comment

### `.github/workflows/netlify-pr.yml`
- **Purpose:** Alternative Netlify PR previews
- **Triggers:** Pull requests to main
- **Result:** Netlify preview deployment

## 🧪 Testing Your Setup

1. **Create a test PR:**
   ```bash
   git checkout -b test/pr-workflow
   echo "# Test PR" >> README.md
   git add README.md
   git commit -m "Test PR workflow"
   git push origin test/pr-workflow
   ```

2. **Create PR on GitHub:**
   - Use the PR template
   - Check that workflows run
   - Verify preview deployment works

3. **Test the preview:**
   - Visit the preview URL
   - Test calendar integration
   - Verify all functionality works

4. **Clean up:**
   - Close the test PR
   - Delete the test branch

## 🎯 Benefits

### For Development:
- ✅ **Safe testing** - Test changes before they go live
- ✅ **Automatic previews** - No manual deployment needed
- ✅ **Status checks** - Ensure quality before merging
- ✅ **Collaboration** - Easy review process

### For Production:
- ✅ **Stable deployments** - Only tested code goes live
- ✅ **Rollback safety** - Easy to revert if needed
- ✅ **Quality assurance** - Multiple eyes on changes
- ✅ **Documentation** - PR history shows what changed

## 🚨 Troubleshooting

### Workflows Not Running:
- Check repository settings → Actions → General
- Ensure "Allow all actions and reusable workflows" is selected
- Verify branch protection rules are set up correctly

### Preview Not Working:
- Check workflow logs in Actions tab
- Verify build passes locally
- Check for any environment-specific issues

### Status Checks Failing:
- Review workflow logs
- Fix any build errors
- Update dependencies if needed

---

**Your PR workflow is now ready! 🎉**

Every pull request will automatically get a preview deployment for testing the calendar integration and other features.
