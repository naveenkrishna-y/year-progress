# Year Progress

A minimalistic year progress tracker with a pitch-black design. Track your year's progress with a simple grid of boxes that darken as days pass.

## Features

- **Pitch-black aesthetic** with white/gray boxes
- **Dynamic grid** showing all days of the current year
- **Auto-updating** - boxes darken automatically as days complete
- **Responsive design** - works on mobile, tablet, and desktop
- **Privacy-focused** - runs completely locally, no data collection
- **PWA ready** - can be installed as an app
- **Minimal permissions** - uses only local device time

## Usage

1. Open `index.html` in your browser
2. The grid shows all days of the current year
3. Completed days appear darker
4. Footer shows current year and days remaining
5. Updates automatically at midnight

## Installation as PWA

1. Open the app in Chrome/Edge
2. Look for "Install" option in browser menu
3. Install as standalone app

## Technical Details

- **Pure HTML/CSS/JavaScript** - no frameworks
- **Responsive grid** - adapts to screen size
- **Service Worker** - for offline functionality
- **Auto-refresh** - checks for date changes every minute
- **Leap year support** - handles 365/366 days correctly

## File Structure

```
year-progress/
├── index.html      # Main HTML file
├── style.css       # Styling and responsive design
├── script.js       # Core functionality
├── manifest.json   # PWA configuration
├── sw.js          # Service worker for offline support
└── README.md      # This file
```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- Android live wallpaper integration
- Custom themes
- Year selection
- Statistics view