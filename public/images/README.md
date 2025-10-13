# Recipe Site Images

This directory stores all images for the recipe site.

## Directory Structure

```
images/
├── recipes/     # Recipe photos
├── tips/        # Cooking tip illustrations
└── README.md    # This file
```

## Adding Images

### For Recipes
1. **Save your image** to `public/images/recipes/`
   - Use descriptive filenames: `brussels-sprouts.jpg`, `chocolate-cake.jpg`
   - Recommended formats: JPG, PNG, WebP
   - Recommended size: 1200x800px or similar (16:9 or 4:3 ratio)

2. **Add to recipe frontmatter:**
   ```markdown
   ---
   title: "My Amazing Recipe"
   image: "/images/recipes/my-recipe.jpg"
   ---
   ```

### For Tips
1. **Save your image** to `public/images/tips/`
2. **Reference in your tip content** using markdown:
   ```markdown
   ![Tip illustration](/images/tips/my-tip.jpg)
   ```

## Using External Images

You can also use external image URLs:
```markdown
image: "https://example.com/path/to/image.jpg"
```

## Best Practices

- **Optimize images** before uploading (use tools like TinyPNG, ImageOptim)
- **Keep file sizes under 500KB** for faster loading
- **Use descriptive filenames** (e.g., `roasted-turkey-plated.jpg`)
- **Maintain aspect ratio** - 16:9 or 4:3 works best
- **Test on mobile** - ensure images look good on all devices

## Image Optimization Tips

- Use JPG for photos (smaller file size)
- Use PNG for graphics with transparency
- Use WebP for best compression (modern browsers)
- Resize to appropriate dimensions before uploading
- Compress images to balance quality and file size

## Submission Forms

When submitting recipes or tips through the site forms, you can:
1. Upload the image to this directory first
2. Use the relative path (e.g., `/images/recipes/filename.jpg`)
3. Or use an external URL from any image hosting service
