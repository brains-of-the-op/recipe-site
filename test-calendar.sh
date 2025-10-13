#!/bin/bash

# 🧪 Calendar Integration Testing Script
# This script helps you quickly test the calendar integration locally

echo "🧪 Calendar Integration Testing Helper"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the recipe-site directory"
    exit 1
fi

# Function to check if dev server is running
check_server() {
    if curl -s http://localhost:4321 > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Start dev server if not running
if ! check_server; then
    echo "🚀 Starting development server..."
    echo ""
    npm run dev &
    DEV_PID=$!
    
    # Wait for server to start
    echo "⏳ Waiting for server to start..."
    sleep 5
    
    # Check if server started successfully
    for i in {1..10}; do
        if check_server; then
            echo "✅ Server is running!"
            break
        fi
        echo "   Still waiting... ($i/10)"
        sleep 2
    done
    
    if ! check_server; then
        echo "❌ Failed to start server"
        exit 1
    fi
else
    echo "✅ Development server is already running"
fi

echo ""
echo "🎯 Test URLs:"
echo "============"
echo ""
echo "Home Page:"
echo "  http://localhost:4321"
echo ""
echo "Recipe Pages (with Calendar Integration):"
echo "  http://localhost:4321/recipes/turkey-dinner/"
echo "  http://localhost:4321/recipes/brussels-sprouts/"
echo "  http://localhost:4321/recipes/sex-in-a-pan/"
echo "  http://localhost:4321/recipes/turkey-gravy/"
echo "  http://localhost:4321/recipes/carrot-swede/"
echo ""
echo "📱 Mobile Testing:"
echo "  Get your local IP: ifconfig | grep 'inet ' | grep -v 127.0.0.1"
echo "  Then visit: http://[YOUR_IP]:4321"
echo ""
echo "🧪 Testing Checklist:"
echo "===================="
echo ""
echo "For each recipe page, verify:"
echo "  [ ] Calendar section appears below recipe content"
echo "  [ ] Timeline preview shows prep/cook/serve phases"
echo "  [ ] Date picker works (default: tomorrow)"
echo "  [ ] Time picker works (default: 6:00 PM)"
echo "  [ ] Timeline updates when date/time changes"
echo "  [ ] 'Add to Google Calendar' button works"
echo "  [ ] 'Add to Apple Calendar' button downloads ICS file"
echo "  [ ] No errors in browser console (F12)"
echo ""
echo "🔍 Browser Console Tests:"
echo "========================"
echo ""
echo "Open DevTools (F12) and run in Console:"
echo ""
echo "  // Check if timeline events are loaded"
echo "  console.log(window.timelineEvents);"
echo ""
echo "  // Check recipe data"
echo "  console.log(window.recipeSlug, window.recipeTitle);"
echo ""
echo "  // Test Google Calendar (should open new tab)"
echo "  window.addToGoogleCalendar();"
echo ""
echo "  // Test ICS download (should download file)"
echo "  window.downloadICSFile();"
echo ""
echo "📋 Common Issues:"
echo "================"
echo ""
echo "❌ Functions undefined?"
echo "   → Check console for 'ReferenceError'"
echo "   → Verify script tag has 'define:vars' attribute"
echo ""
echo "❌ Timeline not updating?"
echo "   → Check event listeners are attached"
echo "   → Verify date/time inputs have correct IDs"
echo ""
echo "❌ ICS file won't open?"
echo "   → Open file in text editor, should start with 'BEGIN:VCALENDAR'"
echo "   → Check file encoding (should be UTF-8)"
echo ""
echo "🏗️ Build Testing:"
echo "================="
echo ""
echo "Before creating a PR, also test the production build:"
echo ""
echo "  npm run build"
echo "  npm run preview"
echo ""
echo "Then visit: http://localhost:4321"
echo ""
echo "✅ Ready to create a PR?"
echo "======================="
echo ""
echo "1. Create feature branch:"
echo "   git checkout -b feature/test-calendar-integration"
echo ""
echo "2. Commit changes (if any):"
echo "   git add ."
echo "   git commit -m 'Test calendar integration'"
echo ""
echo "3. Push to GitHub:"
echo "   git push origin feature/test-calendar-integration"
echo ""
echo "4. Create PR on GitHub:"
echo "   - Use the PR template"
echo "   - Fill out testing checklist"
echo "   - Wait for preview deployment"
echo "   - Test preview URL"
echo ""
echo "📖 For detailed testing instructions, see:"
echo "   TESTING_GUIDE.md"
echo ""
echo "🎉 Happy Testing!"
echo ""

