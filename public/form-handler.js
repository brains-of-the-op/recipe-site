// Client-side form handler for static deployment
// This handles form submissions by redirecting to GitHub with pre-filled issues

class FormHandler {
  constructor() {
    this.githubOwner = 'brains-of-the-op';
    this.githubRepo = 'tihwdi-replies';
    // GitHub token will be set via environment variable or fallback to redirect method
    this.githubToken = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupForms());
    } else {
      this.setupForms();
    }
  }

  setupForms() {
    // Find all forms with data-form-type attribute
    const forms = document.querySelectorAll('[data-form-type]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formType = form.getAttribute('data-form-type');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    if (submitButton) {
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
    }

    try {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Add submitter name if available
      if (!data.submitterName && data.name) {
        data.submitterName = data.name;
      }

      // Try to create GitHub issue directly via API, fallback to redirect
      if (this.githubToken) {
        const result = await this.createGitHubIssue(formType, data);
        
        if (result.success) {
          // Show success message with link to the created issue
          this.showSuccessMessage(form, formType, result.issueUrl);
          
          // Close modal and reset form
          form.closest('.modal').style.display = 'none';
          form.reset();
          return;
        } else {
          console.warn('API failed, falling back to redirect method');
        }
      }
      
      // Fallback: Use redirect method (no token or API failed)
      const issueUrl = this.createGitHubIssueUrl(formType, data);
      window.open(issueUrl, '_blank');
      
      // Show success message
      this.showSuccessMessage(form, formType);
      
      // Close modal and reset form
      form.closest('.modal').style.display = 'none';
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage(form);
    } finally {
      // Reset button
      if (submitButton) {
        submitButton.textContent = 'Submit';
        submitButton.disabled = false;
      }
    }
  }

  async createGitHubIssue(type, data) {
    let title, body, labels;

    switch (type) {
      case 'recipe':
        title = `🍽️ New Recipe: ${data.title}`;
        body = this.createRecipeIssueBody(data);
        labels = ['recipe', 'new-content'];
        break;
      
      case 'tip':
        title = `💡 Cooking Tip: ${data.title}`;
        body = this.createTipIssueBody(data);
        labels = ['tip', 'new-content'];
        break;
      
      case 'planning':
        title = `📅 ${data.type}: ${data.title}`;
        body = this.createPlanningIssueBody(data);
        labels = ['planning', 'family-coordination'];
        break;
      
      case 'feedback':
        title = `🌟 ${data.type}: ${data.title}`;
        body = this.createFeedbackIssueBody(data);
        labels = ['feedback', 'improvement'];
        break;
      
      default:
        throw new Error('Invalid form type');
    }

    try {
      // Use GitHub's API to create the issue directly
      const response = await fetch(`https://api.github.com/repos/${this.githubOwner}/${this.githubRepo}/issues`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'Authorization': `token ${this.githubToken}`
        },
        body: JSON.stringify({
          title: title,
          body: body,
          labels: labels
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('GitHub API Error:', error);
        return { success: false, error: 'Failed to create GitHub issue' };
      }

      const issue = await response.json();
      return { 
        success: true, 
        issueUrl: issue.html_url,
        issueNumber: issue.number
      };

    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  createGitHubIssueUrl(type, data) {
    let title, body, labels;

    switch (type) {
      case 'recipe':
        title = `🍽️ New Recipe: ${data.title}`;
        body = this.createRecipeIssueBody(data);
        labels = ['recipe', 'new-content'];
        break;
      
      case 'tip':
        title = `💡 Cooking Tip: ${data.title}`;
        body = this.createTipIssueBody(data);
        labels = ['tip', 'new-content'];
        break;
      
      case 'planning':
        title = `📅 ${data.type}: ${data.title}`;
        body = this.createPlanningIssueBody(data);
        labels = ['planning', 'family-coordination'];
        break;
      
      case 'feedback':
        title = `🌟 ${data.type}: ${data.title}`;
        body = this.createFeedbackIssueBody(data);
        labels = ['feedback', 'improvement'];
        break;
      
      default:
        throw new Error('Invalid form type');
    }

    const baseUrl = `https://github.com/${this.githubOwner}/${this.githubRepo}/issues/new`;
    const params = new URLSearchParams({
      title: title,
      body: body,
      labels: labels.join(',')
    });

    return `${baseUrl}?${params.toString()}`;
  }

  createRecipeIssueBody(data) {
    return `## 🍽️ New Recipe Submission

**Submitted by:** ${data.submitterName || 'Anonymous'}

### Recipe Details
- **Name:** ${data.title}
- **Prep Time:** ${data.prepTime || 'Not specified'}
- **Cook Time:** ${data.cookTime || 'Not specified'}
- **Servings:** ${data.servings || 'Not specified'}
- **Difficulty:** ${data.difficulty || 'Not specified'}
- **Tags:** ${data.tags || 'None'}
${data.imageUrl ? `- **Image URL:** ${data.imageUrl}` : ''}

${data.imageUrl ? `### Recipe Image\n![Recipe Image](${data.imageUrl})\n` : ''}

### Ingredients
\`\`\`
${data.ingredients}
\`\`\`

### Instructions
\`\`\`
${data.instructions}
\`\`\`

### Pro Tips
${data.proTips || 'None provided'}

---
*This recipe was submitted through the family recipe site. Please review and add to the site if approved!*`;
  }

  createTipIssueBody(data) {
    return `## 💡 New Cooking Tip

**Submitted by:** ${data.submitterName || 'Anonymous'}

### Tip Details
- **Title:** ${data.title}
- **Category:** ${data.category}
${data.imageUrl ? `- **Image URL:** ${data.imageUrl}` : ''}

${data.imageUrl ? `### Tip Image\n![Tip Image](${data.imageUrl})\n` : ''}

### Tip Content
${data.content}

---
*This tip was submitted through the family recipe site. Please review and add to the tips page if approved!*`;
  }

  createPlanningIssueBody(data) {
    return `## 📅 New Planning Suggestion

**Submitted by:** ${data.submitterName || 'Anonymous'}

### Planning Details
- **Type:** ${data.type}
- **Title:** ${data.title}
- **Date:** ${data.date || 'Not specified'}

### Description
${data.description}

---
*This planning suggestion was submitted through the family recipe site. Please review and coordinate with the family!*`;
  }

  createFeedbackIssueBody(data) {
    return `## 🌟 New Feedback

**Submitted by:** ${data.submitterName || 'Anonymous'}

### Feedback Details
- **Type:** ${data.type}
- **Title:** ${data.title}

### Feedback Content
${data.content}

---
*This feedback was submitted through the family recipe site. Please review and take action if needed!*`;
  }

  showSuccessMessage(form, type, issueUrl) {
    const messages = {
      recipe: 'Recipe submitted successfully! A GitHub issue has been created.',
      tip: 'Tip submitted successfully! A GitHub issue has been created.',
      planning: 'Planning suggestion submitted successfully! A GitHub issue has been created.',
      feedback: 'Feedback submitted successfully! A GitHub issue has been created.'
    };

    const message = messages[type] || 'Form submitted successfully!';
    
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div style="
        background: #d4edda;
        color: #155724;
        padding: 12px;
        border-radius: 4px;
        margin-top: 16px;
        border: 1px solid #c3e6cb;
      ">
        ✅ ${message}
        ${issueUrl ? `<br><a href="${issueUrl}" target="_blank" style="color: #155724; text-decoration: underline; font-weight: 600;">View the issue on GitHub</a>` : ''}
      </div>
    `;
    
    // Insert after form
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Remove after 8 seconds (longer since there's a link)
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 8000);
  }

  showErrorMessage(form) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <div style="
        background: #f8d7da;
        color: #721c24;
        padding: 12px;
        border-radius: 4px;
        margin-top: 16px;
        border: 1px solid #f5c6cb;
      ">
        ❌ Something went wrong. Please try again or contact support.
      </div>
    `;
    
    // Insert after form
    form.parentNode.insertBefore(errorDiv, form.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }
}

// Initialize the form handler
new FormHandler();
