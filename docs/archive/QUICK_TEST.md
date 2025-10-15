# ⚡ Quick Test Guide - Calendar Integration

## 🚀 Quick Start

```bash
# Start the dev server
npm run dev

# Visit any recipe page
# Example: http://localhost:4321/recipes/turkey-dinner/
```

## ✅ 5-Minute Test

### 1. Visual Check (30 seconds)
- [ ] Scroll to bottom of recipe page
- [ ] See "Plan Your Cooking Timeline" section
- [ ] Timeline preview is visible with 3 events

### 2. Date/Time Picker (30 seconds)
- [ ] Change the date to tomorrow
- [ ] Change the time to 5:00 PM
- [ ] Verify timeline times update automatically

### 3. Google Calendar (1 minute)
- [ ] Click "Add to Google Calendar" button
- [ ] New tab opens with Google Calendar
- [ ] Event has recipe name and correct time
- [ ] Close tab and return

### 4. Apple Calendar (1 minute)
- [ ] Click "Add to Apple Calendar" button
- [ ] ICS file downloads
- [ ] Double-click file to open in calendar app
- [ ] Verify events are created

### 5. Console Check (30 seconds)
- [ ] Press F12 to open DevTools
- [ ] Go to Console tab
- [ ] Should see NO red errors
- [ ] Type `window.timelineEvents` and press Enter
- [ ] Should see array of events

### 6. Mobile (2 minutes - optional)
```bash
# Start with network access
npm run dev -- --host

# Get your local IP
ifconfig | grep 'inet ' | grep -v 127.0.0.1

# Visit on phone: http://[YOUR_IP]:4321/recipes/turkey-dinner/
```
- [ ] Calendar section fits on screen
- [ ] Buttons are easy to tap
- [ ] Timeline is readable

## 🎯 Expected Results

### Timeline Should Show:
```
6:00 PM - 6:45 PM
Prep: [Recipe Name]

6:45 PM - [End Time]
Cook: [Recipe Name]

[End Time] - [End Time + 30min]
Serve: [Recipe Name]
```

### Console Should Show:
```javascript
> window.timelineEvents
[
  { title: "Prep: ...", start: ..., end: ..., ... },
  { title: "Cook: ...", start: ..., end: ..., ... },
  { title: "Serve: ...", start: ..., end: ..., ... }
]
```

## ❌ Common Issues

| Issue | Solution |
|-------|----------|
| Functions undefined | Refresh the page (F5) |
| Timeline doesn't update | Check date/time inputs work |
| ICS won't open | Try downloading again |
| No calendar section | Clear cache and reload |

## 🔍 Quick Debug

```javascript
// In browser console (F12)

// Check if functions exist
typeof window.addToGoogleCalendar
// Should return: "function"

typeof window.downloadICSFile
// Should return: "function"

// Check data exists
window.timelineEvents.length
// Should return: 3 (or number of events)
```

## ✅ Ready for PR?

If all 5 tests pass:

```bash
# 1. Create branch
git checkout -b test/calendar-integration

# 2. Push to GitHub
git push origin test/calendar-integration

# 3. Create PR on GitHub
# - Fill out the PR template
# - Mark all tests as passed
# - Submit for review
```

## 📚 Need More Details?

See `TESTING_GUIDE.md` for comprehensive testing instructions.

---

**Quick test complete? Great! 🎉**

