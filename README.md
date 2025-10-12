# This Is How We Do It 👨‍👩‍👧‍👦

Welcome to our family's digital cookbook and planning space! This is a modern, scalable recipe website built with Astro that automatically generates beautiful recipe pages from simple Markdown files.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit `http://localhost:4321` to see your site!

## 📝 Adding New Recipes

Adding recipes is super simple! Just follow these steps:

### 1. Create a New Recipe File

Create a new Markdown file in the `src/content/recipes/` directory. Use a descriptive filename (it will become the URL slug):

```
src/content/recipes/my-awesome-recipe.md
```

### 2. Copy This Template

Copy and paste this complete template into your new recipe file:

```markdown
---
title: "Your Recipe Name Here"
prepTime: "15 min"
cookTime: "30 min"
totalTime: "45 min"
servings: "4-6 people"
tags: ["dinner", "vegetarian", "easy"]
difficulty: "Easy"
temperature: "350°F"
date: 2025-01-01
---

# Your Recipe Name Here

Brief description of the recipe and why it's special.

## 🧂 Ingredients

* 2 cups main ingredient
* 1 cup secondary ingredient
* 3 tbsp seasoning
* Salt and pepper to taste

### Optional Additions:
* ¼ cup optional ingredient
* 1 tbsp garnish

## 🔪 Instructions

### Step 1: Preparation
1. Preheat oven to 350°F
2. Prepare your ingredients
3. Set up your workspace

### Step 2: Cooking
1. Heat oil in a large pan
2. Add main ingredients
3. Cook until done (about 10 minutes)

### Step 3: Finishing
1. Season to taste
2. Garnish if desired
3. Serve immediately

## 💡 Pro Tips

* **Timing tip**: Start this while other dishes are cooking
* **Substitution**: You can use X instead of Y
* **Storage**: Keeps well in the fridge for 3 days
* **Variation**: Try adding Z for a different flavor

## 🍳 Cooking Notes

* This pairs well with [other dish]
* Great for meal prep
* Can be made ahead and reheated
```

### 3. Write Your Recipe Content

Use Markdown to write your recipe. Here are some examples:

```markdown
## 🧂 Ingredients

* 2 cups flour
* 1 cup sugar
* 3 eggs
* 1 tsp vanilla

## 🔪 Instructions

### Step 1: Prep
1. Preheat oven to 350°F
2. Grease a 9x13 pan

### Step 2: Mix
1. Combine dry ingredients
2. Add wet ingredients
3. Mix until smooth

## 💡 Pro Tips

* Don't overmix the batter
* Check for doneness with a toothpick
```

### 3. Customize Your Recipe

Replace the template content with your actual recipe:
- Change the title and description
- Update ingredients and quantities
- Write your cooking instructions
- Add your own pro tips and notes

### 4. Save and View

That's it! Save your file and the recipe will automatically appear on your website:
- **Home page**: Shows in the featured recipes section
- **All Recipes page**: Appears in the recipe grid
- **Individual page**: Available at `/recipes/your-recipe-name/`

## 🏷️ Recipe Frontmatter Options

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | Recipe name | `"Chocolate Chip Cookies"` |
| `prepTime` | ❌ | Preparation time | `"15 min"` |
| `cookTime` | ❌ | Cooking time | `"25 min"` |
| `totalTime` | ❌ | Total time | `"40 min"` |
| `servings` | ❌ | Number of servings | `"12 cookies"` |
| `tags` | ❌ | Array of tags | `["dessert", "easy", "chocolate"]` |
| `difficulty` | ❌ | Easy/Medium/Hard | `"Easy"` |
| `temperature` | ❌ | Oven temperature | `"350°F"` |
| `date` | ❌ | Recipe date | `2025-01-01` |

## 🏷️ Quick Reference

### Common Tags
- **Meal types**: `dinner`, `lunch`, `breakfast`, `snack`
- **Difficulty**: `easy`, `medium`, `hard`
- **Dietary**: `vegetarian`, `vegan`, `gluten-free`, `dairy-free`
- **Cooking method**: `baked`, `grilled`, `stovetop`, `slow-cooker`
- **Cuisine**: `italian`, `mexican`, `asian`, `american`
- **Occasion**: `holiday`, `party`, `weeknight`, `weekend`

### Example Tag Combinations
```markdown
tags: ["dinner", "easy", "vegetarian"]           # Simple weeknight meal
tags: ["holiday", "traditional", "turkey"]       # Special occasion
tags: ["breakfast", "quick", "healthy"]          # Morning meal
tags: ["dessert", "no-bake", "chocolate"]        # Sweet treat
```

## 🎨 Styling Your Recipes

### Using Emojis
Add emojis to make your recipes more visually appealing:
- 🧂 Ingredients
- 🔪 Instructions  
- 💡 Tips
- 🍳 Cooking
- 🥄 Serving

### Markdown Features
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- Lists with `*` or `1.`
- Headers with `#`, `##`, `###`

### Special Sections
Use these section headers for consistent styling:
- `## 🧂 Ingredients`
- `## 🔪 Instructions`
- `## 💡 Pro Tips`
- `## 🍳 Cooking Notes`

## 📁 File Organization

```
src/
├── content/
│   ├── config.ts              # Recipe schema (don't edit)
│   └── recipes/               # Your recipe files go here
│       ├── brussels-sprouts.md
│       ├── carrot-swede.md
│       ├── turkey-dinner.md
│       └── your-new-recipe.md
├── layouts/
│   └── RecipeLayout.astro     # Recipe page template
├── pages/
│   ├── index.astro           # Home page
│   ├── recipes.astro         # All recipes page
│   └── recipes/[slug].astro  # Individual recipe pages
└── public/
    ├── styles.css            # Site styling
    └── script.js             # Site functionality
```

## 🚀 Building and Deploying

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run build
# Upload the dist/ folder to your GitHub Pages repository
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI commands |

## 📱 Features

- ✅ **Responsive Design**: Works on all devices
- ✅ **Fast Loading**: Static site generation
- ✅ **SEO Optimized**: Proper meta tags and structure
- ✅ **Easy Content Management**: Just edit Markdown files
- ✅ **Automatic Navigation**: New recipes appear automatically
- ✅ **Tag System**: Organize recipes by categories
- ✅ **Search Ready**: Easy to add search functionality later

## 🎯 Tips for Great Recipes

### 1. Use Descriptive Titles
- ✅ "Creamy Garlic Mashed Potatoes"
- ❌ "Potatoes"

### 2. Include All Times
- Prep time, cook time, and total time help with meal planning

### 3. Use Tags Wisely
- Include main ingredients: `["chicken", "pasta"]`
- Include meal type: `["dinner", "lunch"]`
- Include difficulty: `["easy", "quick"]`
- Include dietary info: `["vegetarian", "gluten-free"]`

### 4. Write Clear Instructions
- Use numbered steps for cooking
- Include temperatures and times
- Add helpful tips and variations

### 5. Add Pro Tips
- Share what you learned while making it
- Include substitution ideas
- Mention timing tips for meal planning

## 🤝 Contributing

To add a new recipe:
1. Create a new `.md` file in `src/content/recipes/`
2. Follow the frontmatter template
3. Write your recipe in Markdown
4. Test locally with `npm run dev`
5. Commit and push your changes

## 🗺️ Future Roadmap

Here are exciting features we're planning to add to make your recipe site even more amazing!

### 🖼️ **Images & Visual Features**

#### **Recipe Images**
- [ ] Add image fields to recipe frontmatter
- [ ] Automatic image optimization with Astro
- [ ] Gallery views for step-by-step photos
- [ ] Print-friendly recipe cards with images
- [ ] Before/after cooking photos
- [ ] Nutritional information displays

#### **Visual Enhancements**
- [ ] Recipe video embeds (YouTube/Vimeo)
- [ ] Interactive ingredient checkboxes
- [ ] Recipe difficulty visual indicators
- [ ] Cooking progress tracking

### ⏰ **Timers & Interactive Features**

#### **Built-in Timers**
- [ ] JavaScript timers for cooking steps
- [ ] Multiple timers for different dishes
- [ ] Audio alerts and notifications
- [ ] Integration with phone/device timers
- [ ] Cooking progress tracking

#### **Interactive Elements**
- [ ] Ingredient scaling (serves 4 → serves 8)
- [ ] Unit conversions (cups ↔ grams)
- [ ] Recipe difficulty ratings
- [ ] Cooking time estimates
- [ ] Ingredient substitution suggestions

### 🛒 **Grocery Lists & Planning**

#### **Smart Grocery Lists**
- [ ] Auto-generate shopping lists from recipes
- [ ] Combine multiple recipes into one list
- [ ] Categorize by store section (produce, dairy, etc.)
- [ ] Export to phone or print
- [ ] Check off items as you shop

#### **Meal Planning**
- [ ] Weekly meal plan generator
- [ ] Recipe suggestions based on ingredients
- [ ] Leftover meal ideas
- [ ] Seasonal recipe recommendations
- [ ] Family cooking schedule

### 📅 **Calendar Integration**

#### **Cooking Timeline Integration**
- [ ] Add recipes to your calendar with prep times
- [ ] Automatic scheduling based on cooking duration
- [ ] Holiday meal planning with timeline
- [ ] Family cooking schedule coordination
- [ ] Recipe reminders and notifications

#### **Advanced Planning**
- [ ] Seasonal cooking calendar
- [ ] Family cooking assignments
- [ ] Special occasion planning
- [ ] Cooking event coordination

### 🚀 **Implementation Priority**

#### **Phase 1: Easy Wins (Quick to Add)**
1. **Recipe Images** - Add image URLs to frontmatter
2. **Ingredient Scaling** - JavaScript calculator
3. **Print Styles** - CSS for recipe cards
4. **Grocery List Generator** - Simple JavaScript
5. **Interactive Checkboxes** - Mark ingredients as you prep

#### **Phase 2: Medium Complexity**
1. **Interactive Timers** - JavaScript with audio alerts
2. **Calendar Integration** - Google Calendar API
3. **Recipe Search/Filtering** - Enhanced with tags
4. **Mobile App Features** - PWA capabilities
5. **Unit Conversions** - Cups to grams, etc.

#### **Phase 3: Advanced Features**
1. **AI Recipe Suggestions** - Based on available ingredients
2. **Nutritional Analysis** - API integration
3. **Family Collaboration** - Multiple users, shared recipes
4. **Smart Shopping** - Store integration, price tracking
5. **Recipe Video Integration** - Step-by-step cooking videos

### 💡 **How to Contribute**

Want to help add these features? Here's how:

1. **Pick a feature** from the roadmap that interests you
2. **Check the existing code** to understand the structure
3. **Start small** - even simple improvements are valuable
4. **Ask for help** - we're all learning together!

### 🎯 **Current Status**

- ✅ **Basic recipe site** - Working beautifully!
- ✅ **5 family recipes** - All converted and formatted
- ✅ **Cozy pastel design** - Warm and inviting
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Easy recipe addition** - Just add Markdown files
- ✅ **Interactive hero features** - Family can submit recipes and tips!
- ✅ **GitHub API integration** - Submissions create GitHub issues automatically
- 🔄 **Next up**: Recipe images and ingredient scaling

---

## 🔗 GitHub Integration

Your recipe site now has **interactive submission forms** that create GitHub issues automatically! Family members can:

- **Submit new recipes** through the "Document favorite recipes" form
- **Share cooking tips** through the "Share cooking tips" form  
- **Plan meals and events** through the "Plan meals & events" form
- **Give feedback** through the "Track what works" form

### Setup Instructions

See `GITHUB_SETUP.md` for detailed setup instructions to enable the GitHub API integration.

### How It Works

1. **Family member fills out a form** on your recipe site
2. **Form submission creates a GitHub issue** automatically
3. **You get notified** and can review the submission
4. **Approve and implement** the new recipe or tip
5. **Family sees their contribution** live on the site!

## 📞 Need Help?

- Check the [Astro documentation](https://docs.astro.build/)
- Look at existing recipes for examples
- Ask family members for recipe ideas!
- Review the roadmap above for inspiration
- See `GITHUB_SETUP.md` for API integration help

---

**Happy Cooking! 🍳✨**

*Made with ❤️ for family cooking*