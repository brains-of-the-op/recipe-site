# 🧪 Calendar Integration Testing Guide

This guide will help you test the calendar integration locally before creating a pull request.

## 🚀 Local Testing Setup

### 1. Start the Development Server

```bash
npm run dev
```

The server will start at `http://localhost:4321`

### 2. Test on Your Network (Optional)

To test on mobile devices on the same network:

```bash
npm run dev -- --host
```

This makes the site available at your local IP (e.g., `http://192.168.1.x:4321`)

## ✅ Testing Checklist

### **Basic Functionality**

Visit any recipe page (e.g., `http://localhost:4321/recipes/turkey-dinner/`)

- [ ] **Page loads correctly** - No errors in browser console
- [ ] **Calendar section appears** - "Plan Your Cooking Timeline" is visible
- [ ] **Timeline preview displays** - Shows prep/cook/serve phases with times
- [ ] **Date picker works** - Can select a future date
- [ ] **Time picker works** - Can select a start time
- [ ] **Timeline updates** - Times change when you adjust date/time

### **Google Calendar Integration**

- [ ] **Button is visible** - "Add to Google Calendar" button appears
- [ ] **Button is clickable** - No JavaScript errors when clicked
- [ ] **Opens Google Calendar** - Opens in new tab/window
- [ ] **Event details populated** - Recipe name, time, description are correct
- [ ] **Multiple events created** - One for prep, cook, and serve phases
- [ ] **Times are accurate** - Events match the timeline preview

### **Apple Calendar Integration**

- [ ] **Button is visible** - "Add to Apple Calendar" button appears
- [ ] **Button is clickable** - No JavaScript errors when clicked
- [ ] **File downloads** - ICS file downloads to your computer
- [ ] **File opens in calendar app** - Can open with Apple Calendar/Outlook
- [ ] **Events are correct** - Prep, cook, serve phases are all present
- [ ] **Times match** - Events match the selected date/time

### **Timeline Accuracy**

Test with different recipes:

#### **Turkey Dinner** (long recipe)
- Prep: 45 min
- Cook: 4-5 hours
- [ ] Timeline shows correct prep time
- [ ] Timeline shows correct cook time
- [ ] Serving time is after cook time
- [ ] Total duration makes sense

#### **Brussels Sprouts** (short recipe)
- Prep: 10 min
- Cook: 25 min
- [ ] Timeline shows correct prep time
- [ ] Timeline shows correct cook time
- [ ] Events are properly spaced

#### **Sex in a Pan** (no-cook recipe)
- Prep: 30 min
- Cook: 0 min
- [ ] Timeline handles zero cook time correctly
- [ ] Events are created properly

### **Browser Console Check**

Open Developer Tools (F12) and check the Console tab:

- [ ] **No JavaScript errors** - When page loads
- [ ] **No errors on button click** - Google Calendar button
- [ ] **No errors on button click** - Apple Calendar button
- [ ] **No errors on date/time change** - Timeline updates smoothly
- [ ] **Window variables exist** - Check `window.timelineEvents`, `window.recipeSlug`, `window.recipeTitle`

### **Mobile Testing**

If testing on mobile (use `npm run dev -- --host`):

- [ ] **Calendar section is responsive** - Fits screen properly
- [ ] **Date/time pickers work** - Native mobile pickers work
- [ ] **Buttons are touch-friendly** - Easy to tap
- [ ] **Timeline is readable** - Text isn't too small
- [ ] **Google Calendar opens** - Opens Google Calendar app or web
- [ ] **ICS download works** - File downloads or opens in calendar app

### **Cross-Browser Testing**

Test in multiple browsers:

- [ ] **Chrome/Chromium** - All features work
- [ ] **Firefox** - All features work
- [ ] **Safari** - All features work (especially ICS download)
- [ ] **Edge** - All features work

### **User Experience Testing**

- [ ] **Default date/time is set** - Tomorrow at 6 PM
- [ ] **Timeline is intuitive** - Easy to understand the cooking schedule
- [ ] **Instructions are clear** - Users know what to do
- [ ] **Visual hierarchy works** - Important info stands out
- [ ] **Colors are accessible** - Good contrast and readability

### **Edge Cases**

- [ ] **Same-day cooking** - Can select today's date
- [ ] **Late-night cooking** - Timeline handles midnight crossover
- [ ] **Multiple recipes** - Works on all recipe pages
- [ ] **No cook time** - Handles recipes without cooking phase
- [ ] **Very long recipes** - Turkey (4+ hours) displays correctly

## 🐛 Common Issues to Check

### **JavaScript Not Loading**
- **Symptom**: Buttons don't do anything when clicked
- **Check**: Console for "ReferenceError: addToGoogleCalendar is not defined"
- **Location**: `src/components/CalendarIntegration.astro`
- **Fix**: Ensure functions are attached to `window` object

### **Timeline Not Updating**
- **Symptom**: Times don't change when you pick a new date/time
- **Check**: Console for errors in `updateTimelinePreview`
- **Fix**: Ensure event listeners are attached properly

### **ICS File Empty or Corrupted**
- **Symptom**: Downloaded file doesn't open in calendar app
- **Check**: Open the `.ics` file in a text editor
- **Expected**: Should see `BEGIN:VCALENDAR` and `BEGIN:VEVENT`
- **Fix**: Check ICS generation in `downloadICSFile` function

### **Google Calendar Link Broken**
- **Symptom**: Opens Google Calendar but event is empty
- **Check**: URL encoding of title and description
- **Fix**: Ensure `encodeURIComponent` is used correctly

### **Times are Wrong**
- **Symptom**: Calendar events show different times than timeline
- **Check**: Timezone handling
- **Fix**: Verify `toISOString()` and timezone conversions

## 📸 Visual Testing

### **Expected Layout**

The calendar integration section should appear:
1. **After the recipe content** (ingredients and instructions)
2. **Before the footer**
3. **Full width** within the container
4. **With a white background** and subtle border

### **Timeline Preview Should Show**

```
Your Cooking Timeline:

6:00 PM - 6:45 PM
Prep: Butter-Herb Turkey Dinner
Preparation time for Butter-Herb Turkey Dinner. Gather ingredients and prep as needed.

6:45 PM - 10:45 PM
Cook: Butter-Herb Turkey Dinner
Active cooking time for Butter-Herb Turkey Dinner. Follow recipe instructions.

10:45 PM - 11:15 PM
Serve: Butter-Herb Turkey Dinner
Time to serve Butter-Herb Turkey Dinner! Serves 6-10 people.
```

### **Color Coding**
- **Prep events**: Light green background
- **Cook events**: Light orange/tan background
- **Serve events**: Light pink background

## 🔍 Testing in DevTools

### **Check Window Variables** (in Console)

```javascript
// Should return an array of timeline events
window.timelineEvents

// Should return the recipe slug
window.recipeSlug

// Should return the recipe title
window.recipeTitle
```

### **Test Functions Manually** (in Console)

```javascript
// Test Google Calendar function
window.addToGoogleCalendar()

// Test ICS download
window.downloadICSFile()
```

### **Inspect Network Requests**

- [ ] No 404 errors for JavaScript files
- [ ] No failed CSS requests
- [ ] Calendar API endpoints (if any) work correctly

## ✅ Sign-Off Checklist

Before creating a PR, verify:

### **Code Quality**
- [ ] No console errors
- [ ] No console warnings (except Vite/Astro build warnings)
- [ ] Code follows existing patterns
- [ ] Comments are clear and helpful

### **Functionality**
- [ ] All calendar features work
- [ ] Timeline is accurate
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### **User Experience**
- [ ] Intuitive to use
- [ ] Clear instructions
- [ ] Good visual design
- [ ] Accessible (keyboard navigation, screen readers)

### **Build and Deploy**
- [ ] Local build succeeds (`npm run build`)
- [ ] Preview build works (`npm run preview`)
- [ ] No new linter errors
- [ ] Bundle size is reasonable

## 🚀 Creating a Pull Request

Once all tests pass:

### **1. Check Current Branch**
```bash
git status
```

### **2. Create Feature Branch**
```bash
git checkout -b feature/calendar-integration-testing
```

### **3. Commit Your Changes**
```bash
git add .
git commit -m "Test and verify calendar integration functionality"
```

### **4. Push to GitHub**
```bash
git push origin feature/calendar-integration-testing
```

### **5. Create PR on GitHub**
- Go to your repository on GitHub
- Click "New Pull Request"
- Select your feature branch
- Use the PR template that appears
- Fill out the testing checklist
- Submit for review

### **6. PR Preview**
- GitHub Actions will automatically create a preview deployment
- Test the preview URL that gets posted in the PR comments
- Verify everything works in the deployed preview
- Request review from maintainers

## 📝 Testing Notes Template

Use this template to document your testing:

```markdown
## Testing Results

**Date**: [Today's date]
**Tester**: [Your name]
**Browser**: [Browser and version]
**Device**: [Desktop/Mobile]

### ✅ Passed
- Calendar section displays correctly
- Google Calendar integration works
- Apple Calendar ICS download works
- Timeline updates in real-time
- Mobile responsive design works

### ⚠️ Issues Found
- [List any issues you found]

### 🔧 Fixes Applied
- [List any fixes you made]

### 📸 Screenshots
[Attach screenshots if applicable]

### 🎯 Ready for PR?
- [x] Yes, all tests pass
- [ ] No, needs more work
```

---

**Happy Testing! 🧪✨**

*Thorough testing ensures a great experience for everyone using the recipe site!*

