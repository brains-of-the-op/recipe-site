# 🚀 Quick Start: Adding Your First Image

## Super Quick Method (2 minutes)

### Using an External URL
1. Find a food photo on [Unsplash](https://unsplash.com)
2. Right-click → Copy image address
3. Edit your recipe file:
   ```markdown
   ---
   title: "My Recipe"
   image: "https://images.unsplash.com/photo-PASTE-URL-HERE"
   ---
   ```
4. Save and rebuild: `npm run build`

### Using a Local Image
1. Save your photo as `public/images/recipes/my-recipe.jpg`
2. Edit your recipe file:
   ```markdown
   ---
   title: "My Recipe"
   image: "/images/recipes/my-recipe.jpg"
   ---
   ```
3. Save and rebuild: `npm run build`

## Through the Submission Form
1. Visit your site's home page
2. Click "Document favorite recipes"
3. Fill out the form
4. Enter image URL in the "Recipe Image URL" field
5. Submit!

## Need More Help?
- See `IMAGE_GUIDE.md` for detailed instructions
- See existing recipes for examples
- Check `/public/images/README.md` for best practices

**That's it! Your recipe now has an image! 📸**
