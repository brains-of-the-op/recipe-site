// Client-side form handler for static deployment
// This handles form submissions by redirecting to GitHub with pre-filled issues

class FormHandler {
  constructor() {
    this.githubOwner = 'brains-of-the-op';
    this.githubRepo = 'tihwdi-replies';
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
      
      // Reset after 3 seconds if something goes wrong
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 3000);
    }

    try {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Add submitter name if available
      if (!data.submitterName && data.name) {
        data.submitterName = data.name;
      }

      // Create GitHub issue URL
      const issueUrl = this.createGitHubIssueUrl(formType, data);
      
      // Redirect to GitHub
      window.open(issueUrl, '_blank');
      
      // Show success message
      this.showSuccessMessage(form, formType);
      
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

  showSuccessMessage(form, type) {
    const messages = {
      recipe: 'Recipe submitted! Please complete your submission on GitHub.',
      tip: 'Tip submitted! Please complete your submission on GitHub.',
      planning: 'Planning suggestion submitted! Please complete your submission on GitHub.',
      feedback: 'Feedback submitted! Please complete your submission on GitHub.'
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
      </div>
    `;
    
    // Insert after form
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 5000);
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
