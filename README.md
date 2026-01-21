# LAZAREV. Clone - Modularized
live url:https://beamish-cajeta-b009d1.netlify.app/

This project is a clone of the LAZAREV. agency website, refactored into a modular structure for better maintainability.

## 🚀 Running the Project

Because the HTML is split into separate modules (to keep the code clean), **you must run this project on a local server**. Browsers block loading separate HTML files directly from the file system (`file://`) for security reasons.

### Option 1: Using Python (Recommended)
If you have Python installed (most Linux/Mac systems do), run:

```bash
# Run this in the project directory
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Option 2: Using VS Code Live Server
1. Install the "Live Server" extension for VS Code.
2. Open `index.html`.
3. Click "Go Live" in the bottom right corner.

## 📁 Project Structure

```
LAZAREV CLONE!!/
├── css/                    # Modular CSS files
│   ├── base.css           # Global styles
│   ├── layout.css         # Structure
│   ├── components.css     # Buttons, forms
│   └── ...
│
├── js/                     # Modular JavaScript
│   ├── loader.js          # Loads HTML sections
│   ├── locomotive.js      # Smooth scrolling
│   ├── animations.js      # GSAP animations
│   └── ...
│
├── sections/               # HTML Section Templates
│   ├── nav.html           # Navigation bar
│   ├── hero.html          # Hero section
│   ├── footer.html        # Footer
│   └── ...
│
└── index.html             # Main entry point (Shell)
```

## 🛠️ Tech Stack
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **GSAP** (GreenSock Animation Platform) - For complex animations
- **Locomotive Scroll** - For smooth scrolling
- **Remix Icon** - For icons
