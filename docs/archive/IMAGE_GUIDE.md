# 🖼️ Image Guide for Recipe Site

This guide explains how to add images to your recipes and tips on the family recipe site.

## 📸 Quick Start

### Adding Images to Recipes

There are two ways to add images to your recipes:

#### Method 1: Using the Submission Form (Easiest)
1. Visit the home page and click "Document favorite recipes"
2. Fill out the recipe form
3. In the "Recipe Image URL" field, enter either:
   - A web URL: `https://example.com/image.jpg`
   - A local path: `/images/recipes/my-dish.jpg` (if you've already uploaded the image)

#### Method 2: Editing Recipe Files Directly
1. **Add your image** to `public/images/recipes/`
2. **Update the recipe frontmatter:**
   ```markdown
   ---
   title: "My Amazing Recipe"
   image: "/images/recipes/my-recipe.jpg"
   prepTime: "30 min"
   cookTime: "1 hour"
   ---
   ```

## 📁 Directory Structure

```
public/
└── images/
    ├── recipes/          # Recipe photos go here
    │   ├── brussels-sprouts.svg
    │   ├── chocolate-cake.jpg
    │   └── turkey-dinner.jpg
    ├── tips/             # Cooking tip illustrations
    │   └── knife-skills.jpg
    └── README.md         # Image directory documentation
```

## 🎨 Image Best Practices

### Recommended Specifications
- **Format:** JPG for photos, PNG for graphics, WebP for best compression
- **Dimensions:** 1200x800px (or similar 16:9 / 4:3 ratio)
- **File Size:** Keep under 500KB for fast loading
- **Naming:** Use descriptive, lowercase names with hyphens:
  - ✅ `roasted-brussels-sprouts.jpg`
  - ✅ `grandmas-chocolate-chip-cookies.jpg`
  - ❌ `IMG_1234.jpg`
  - ❌ `Photo May 15.jpg`

### Image Quality Tips
- **Good lighting:** Natural daylight works best
- **Clean background:** Simple plates and surfaces
- **Show the food:** Close-up shots that make the dish look appetizing
- **Multiple angles:** Consider top-down and 45-degree angles
- **Garnish matters:** A little garnish makes photos pop!

### Optimization Tools
Before uploading, optimize your images using:
- [TinyPNG](https://tinypng.com/) - Free online compression
- [ImageOptim](https://imageoptim.com/) - Mac app for compression
- [Squoosh](https://squoosh.app/) - Google's web-based optimizer
- Built-in tools: Preview (Mac), Paint (Windows)

## 📝 Examples

### Example 1: Recipe with Local Image

**File:** `src/content/recipes/chocolate-cake.md`
```markdown
---
title: "Grandma's Chocolate Cake"
image: "/images/recipes/chocolate-cake.jpg"
prepTime: "20 min"
cookTime: "35 min"
totalTime: "55 min"
servings: "8-10 slices"
tags: ["dessert", "chocolate", "birthday"]
difficulty: "Easy"
date: 2025-01-15
---

# Grandma's Chocolate Cake

The best chocolate cake you'll ever make! Moist, rich, and perfect for any celebration.

## 🧂 Ingredients
...
```

### Example 2: Recipe with External URL

```markdown
---
title: "Thai Green Curry"
image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd"
prepTime: "15 min"
cookTime: "25 min"
tags: ["thai", "curry", "dinner"]
---
```

### Example 3: Adding Images in Content

You can also add images within your recipe content using Markdown:

```markdown
## 🔪 Instructions

### Step 1: Prepare the Vegetables
![Chopped vegetables](/images/recipes/veggie-prep.jpg)

Chop all vegetables into uniform pieces...
```

## 🌐 Using External Images

You can use images from anywhere on the web:

### Free Image Sources
- [Unsplash](https://unsplash.com/) - High-quality free photos
- [Pexels](https://pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images and videos

### Using External URLs
```markdown
---
image: "https://images.unsplash.com/photo-1234567890"
---
```

**Note:** External images depend on the hosting service. For long-term reliability, we recommend storing images locally in the `public/images/` directory.

## 📱 Submission Forms

### Recipe Submission Form
When submitting a recipe through the form:
1. Fill out all recipe details
2. In the "Recipe Image URL" field:
   - **Option A:** Upload your image to `public/images/recipes/` first, then use `/images/recipes/filename.jpg`
   - **Option B:** Use an external URL like `https://example.com/image.jpg`
3. The image will be included in the GitHub issue for review

### Tip Submission Form
Same process for cooking tips:
1. Upload to `public/images/tips/` or use external URL
2. Enter the URL in the "Tip Image URL" field

## 🔧 Technical Details

### Image Display
- Recipe images appear:
  - On the home page recipe grid
  - At the top of individual recipe pages
  - In the "All Recipes" page
- Images are responsive and adapt to screen size
- Automatic styling with rounded corners and shadows

### Image Optimization
Astro automatically optimizes images at build time when using the `<Image>` component. For now, the site uses standard `<img>` tags, so pre-optimize your images before uploading.

### Future Enhancements
Planned improvements:
- [ ] Automatic image optimization
- [ ] Multiple images per recipe (gallery view)
- [ ] Step-by-step photo instructions
- [ ] Before/after cooking photos
- [ ] Direct file upload from forms (requires backend)

## ❓ Troubleshooting

### Image Not Showing
1. **Check the path:** Paths should start with `/images/`
   - ✅ `/images/recipes/my-dish.jpg`
   - ❌ `images/recipes/my-dish.jpg`
   - ❌ `./images/recipes/my-dish.jpg`

2. **Check the file location:** File must be in `public/images/`
   - ✅ `public/images/recipes/my-dish.jpg`
   - ❌ `src/images/recipes/my-dish.jpg`

3. **Check the filename:** Filenames are case-sensitive
   - If file is `Brussels-Sprouts.jpg`, reference it exactly the same way

4. **Rebuild the site:** After adding images, rebuild:
   ```bash
   npm run build
   ```

### Image Too Large / Slow Loading
1. **Optimize the image** using tools mentioned above
2. **Resize to appropriate dimensions** (1200px width is plenty)
3. **Compress without losing quality** (aim for under 500KB)

### External Image Broken
1. **Check the URL** - make sure it's publicly accessible
2. **Consider downloading** and hosting locally for reliability
3. **Check image hosting permissions** - some sites block hotlinking

## 💡 Pro Tips

1. **Take photos in good lighting** - Natural daylight near a window works best
2. **Use a simple background** - White plates on neutral surfaces look clean
3. **Style your food** - A little garnish goes a long way
4. **Shoot multiple angles** - Top-down and 45-degree work well for most dishes
5. **Edit before uploading** - Adjust brightness, contrast, and crop if needed
6. **Keep it real** - Your family wants to see what the dish actually looks like!
7. **Add alt text** - Describe the image for accessibility (automatically uses recipe title)

## 📚 Additional Resources

- [Food Photography Tips](https://www.foodphotographyblog.com/)
- [Styling Tips for Home Cooks](https://www.seriouseats.com/food-photography-tips)
- [iPhone Food Photography](https://iphonephotographyschool.com/food-photography/)

## 🤝 Need Help?

If you have questions about adding images:
1. Check this guide first
2. Look at existing recipes with images as examples
3. Ask in the family group chat
4. Submit feedback through the site's feedback form

---

**Happy cooking and photographing! 📸🍳**

