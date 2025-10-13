import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { recipeData, startTime, events } = await request.json();
    
    if (!recipeData || !startTime || !events) {
      return new Response(JSON.stringify({ 
        error: 'Missing required data' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate ICS file content
    const icsContent = generateICSContent(recipeData, startTime, events);
    
    return new Response(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar;charset=utf-8',
        'Content-Disposition': `attachment; filename="${recipeData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cooking_timeline.ics"`
      }
    });
  } catch (error) {
    console.error('Error generating calendar events:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function generateICSContent(recipeData: any, startTime: string, events: any[]) {
  const startDate = new Date(startTime);
  
  let icsContent = 'BEGIN:VCALENDAR\r\n';
  icsContent += 'VERSION:2.0\r\n';
  icsContent += 'PRODID:-//Recipe Site//Cooking Timeline//EN\r\n';
  icsContent += 'CALSCALE:GREGORIAN\r\n';
  icsContent += 'METHOD:PUBLISH\r\n';
  
  events.forEach((event, index) => {
    const eventStart = new Date(startDate.getTime() + (index > 0 ? 
      events.slice(0, index).reduce((sum: number, e: any) => sum + (e.duration || 0), 0) : 0));
    const eventEnd = new Date(eventStart.getTime() + (event.duration || 0));
    
    icsContent += 'BEGIN:VEVENT\r\n';
    icsContent += `UID:${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}@recipe-site.com\r\n`;
    icsContent += `DTSTART:${formatICSDate(eventStart)}\r\n`;
    icsContent += `DTEND:${formatICSDate(eventEnd)}\r\n`;
    icsContent += `SUMMARY:${escapeICS(event.title)}\r\n`;
    icsContent += `DESCRIPTION:${escapeICS(event.description)}\r\n`;
    icsContent += `LOCATION:Kitchen\r\n`;
    icsContent += `CATEGORIES:COOKING,${event.type.toUpperCase()}\r\n`;
    icsContent += 'STATUS:CONFIRMED\r\n';
    icsContent += 'SEQUENCE:0\r\n';
    icsContent += 'END:VEVENT\r\n';
  });
  
  icsContent += 'END:VCALENDAR\r\n';
  
  return icsContent;
}

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// Also support GET for direct ICS download
export const GET: APIRoute = async ({ url }) => {
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get('title') || 'Cooking Timeline';
  const startTime = searchParams.get('startTime') || new Date().toISOString();
  
  // Create a simple default event
  const defaultEvents = [{
    title: `Cook: ${title}`,
    description: `Time to cook ${title}!`,
    type: 'cook',
    duration: 60 * 60 * 1000 // 1 hour
  }];
  
  const icsContent = generateICSContent({ title }, startTime, defaultEvents);
  
  return new Response(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar;charset=utf-8',
      'Content-Disposition': `attachment; filename="${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cooking_timeline.ics"`
    }
  });
};
