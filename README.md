# F1 Guide - Formula 1 Educational Website

A comprehensive, interactive guide to Formula 1 racing built with pure HTML, CSS, and JavaScript. This project serves as both an educational resource for F1 beginners and fans, and a showcase of modern web development without frameworks.

## 🏎️ Features

### 1. **Home Page**
- Hero section with animated checkered flag background
- Introduction to Formula 1
- Quick stats display
- Call-to-action buttons

### 2. **Beginner's Guide**
- Race weekend format explanation
- Interactive tire compound guide (click to expand details)
- F1 flags reference with meanings
- Key concepts: DRS, pit stops, safety car, points system

### 3. **Drivers & Teams**
- Complete 2024 F1 driver lineup
- Team filtering system
- Driver cards with hover effects
- Driver information including number, team, and country

### 4. **Tracks & Calendar**
- 2024 F1 race calendar
- Month-based filtering
- Detailed track information modal
- Interactive lap animation
- Track statistics and records

### 5. **Quiz System**
- 20-question F1 knowledge quiz
- Random question selection (10 per quiz)
- Score tracking with localStorage
- Personal best score and quiz count
- Instant feedback on answers

### 6. **F1 Dictionary**
- Comprehensive glossary of F1 terms
- Search functionality
- Expandable definitions
- Alphabetically organized

### 7. **Interactive Car Guide**
- SVG-based F1 car diagram
- Clickable car components
- Detailed explanations of each part
- Visual highlighting on hover

### 8. **Contact Page**
- Validated contact form
- Real-time field validation
- Success/error messaging
- Form data saved to localStorage

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and animations throughout
- **Racing-Inspired Aesthetics**: Red accents, bold typography, checkered patterns
- **Professional Typography**: Rajdhani and Orbitron fonts
- **Interactive Elements**: Hover effects, click interactions, smooth scrolling

## 📁 Project Structure

```
f1-website/
│
├── index.html              # Main HTML file
│
├── css/
│   └── styles.css          # All styling (responsive)
│
├── js/
│   ├── app.js              # Main app initialization
│   ├── navigation.js       # Page navigation & routing
│   ├── guide.js            # Beginner guide features
│   ├── drivers.js          # Drivers section logic
│   ├── tracks.js           # Tracks calendar & details
│   ├── quiz.js             # Quiz functionality
│   ├── dictionary.js       # Dictionary search & display
│   ├── car.js              # Interactive car guide
│   └── contact.js          # Form validation
│
└── data/
    ├── drivers.json        # Driver database
    ├── tracks.json         # Track/calendar data
    └── quiz.json           # Quiz questions
```

## 🚀 Getting Started

### Local Development

1. **Clone or download** the project files

2. **Open in browser**:
   - Simply open `index.html` in any modern browser
   - No build process required!

3. **Local server (optional)**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```
   Then visit `http://localhost:8000`

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Upload all project files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

## 💾 Data Storage

The website uses browser localStorage for:
- **Quiz statistics**: Best score and total quizzes taken
- **Contact submissions**: Form data (demonstration purposes)

No backend server required!

## 🎯 Technical Highlights

### Pure JavaScript
- No frameworks or libraries
- Modular code organization
- Event-driven architecture
- Async/await for data loading

### CSS Features
- CSS Variables for theming
- Flexbox and Grid layouts
- CSS animations and transitions
- Mobile-first responsive design

### Interactive Elements
- SPA-style navigation without page reloads
- Dynamic content loading from JSON
- Real-time search and filtering
- Form validation
- Modal dialogs
- localStorage persistence

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎓 Educational Use

This project is perfect for:
- School web development projects
- Learning modern HTML/CSS/JavaScript
- Understanding SPA concepts
- Portfolio demonstrations
- F1 fan education

## 📝 Customization

### Adding More Drivers
Edit `data/drivers.json`:
```json
{
    "id": 21,
    "name": "New Driver",
    "number": 99,
    "team": "New Team",
    "country": "Country",
    "emoji": "🏎️"
}
```

### Adding More Tracks
Edit `data/tracks.json`:
```json
{
    "id": 21,
    "name": "New Circuit",
    "location": "City, Country",
    "date": "2024-12-01",
    "length": "5.5 km",
    "laps": 60,
    "turns": 18,
    "description": "Circuit description",
    "firstGP": 2020,
    "lapRecord": "1:30.000 (Driver, Year)"
}
```

### Adding Quiz Questions
Edit `data/quiz.json`:
```json
{
    "question": "Your question here?",
    "answers": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0
}
```

### Changing Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --bg-primary: #0a0a0a;
    --accent-color: #e10600;
    /* etc. */
}
```

## 🏁 Features Checklist

- [x] Fully responsive design
- [x] SPA-style navigation
- [x] Interactive tire guide
- [x] Driver filtering by team
- [x] Track calendar with month filtering
- [x] Interactive quiz with scoring
- [x] Searchable dictionary
- [x] Interactive car diagram
- [x] Form validation
- [x] localStorage persistence
- [x] Mobile-friendly navigation
- [x] Smooth animations
- [x] Professional design
- [x] No external dependencies

## 📄 License

This is an educational project. Formula 1, F1, and related trademarks are owned by Formula One Licensing BV. This project is not officially affiliated with Formula 1.

## 🙏 Acknowledgments

- Font families: Rajdhani & Orbitron (Google Fonts)
- F1 data sourced from public information
- Design inspired by motorsport aesthetics

## 🤝 Contributing

This is a school project, but feel free to:
- Fork and modify for your own use
- Suggest improvements
- Report any issues

---

**Enjoy learning about Formula 1! 🏎️💨**
