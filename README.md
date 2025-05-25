# 📱 Mobile-First Tic-Tac-Toe

A modern, mobile-first tic-tac-toe game built with React, TypeScript, and Vite. Designed with touch-first interactions, accessibility, and beautiful UX in mind.

## 🚀 Live Demo

**[Play the Game](https://snowonacactus.github.io/tictactoe-mobile-first/)**

## ✨ Features

### 🎮 Core Game Features
- **Classic Tic-Tac-Toe**: Traditional 3x3 grid gameplay
- **Smart Win Detection**: Automatic win/draw detection with visual highlights
- **Game History**: Undo moves and restart functionality
- **Score Tracking**: Visual tally system for wins

### 📱 Mobile-First Design
- **Touch-Optimized**: 48px+ touch targets meeting WCAG guidelines
- **Responsive Layout**: Optimized for screens from 320px to desktop
- **Gesture Controls**: Swipe left to undo, swipe right to restart
- **Haptic Feedback**: Vibration patterns for enhanced mobile experience

### 🎨 Customization
- **8 Color Options**: Per player color customization
- **10 Symbol Choices**: Traditional X/O plus emoji options (🔥, ⭐, 🎯, etc.)
- **Dark/Light Themes**: System preference detection with manual toggle
- **Real-time Updates**: Instant visual feedback for all customizations

### ♿ Accessibility
- **WCAG AA Compliant**: High contrast ratios and proper touch targets
- **Reduced Motion Support**: Respects user motion preferences
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Friendly**: Semantic HTML and ARIA labels

### 🎯 UX Enhancements
- **Collapsible Sidebars**: Player homebases slide in from screen edges
- **Progressive Disclosure**: Tabbed interface (📊 Stats / 🎨 Colors / 🔤 Symbols)
- **Smooth Animations**: 60fps animations with performance optimization
- **Backdrop Blur**: Modern glass-morphism effects

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom properties, Grid, Flexbox
- **Vitest** - Unit testing framework
- **GitHub Pages** - Deployment platform

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MobileGame.tsx      # Main game container
│   ├── MobileHeader.tsx    # Game status header
│   ├── MobileSidebar.tsx   # Player customization panels
│   ├── MobileBottomNav.tsx # Touch-friendly navigation
│   ├── Board.tsx           # Game board logic
│   └── Square.tsx          # Individual game squares
├── styles/
│   └── MobileGame.css      # Comprehensive mobile-first styles
└── App.tsx                 # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SnowOnACactus/tictactoe-mobile-first.git
   cd tictactoe-mobile-first
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

## 📱 Mobile Testing

### Browser Dev Tools
- **Chrome**: F12 → Device Toolbar → Select device
- **Firefox**: F12 → Responsive Design Mode
- **Edge**: F12 → Device Emulation

### Recommended Test Devices
- iPhone SE (375×667) - Minimum supported width
- iPhone 12/13/14 (390×844) - Modern iPhone standard
- iPhone 15 Pro Max (430×932) - Large iPhone
- Galaxy S21 (360×800) - Android standard
- iPad Mini (768×1024) - Tablet view

## 🎯 Design Philosophy

This project prioritizes:

1. **Mobile-First**: Designed for touch, scaled up for desktop
2. **Accessibility**: WCAG AA compliance and inclusive design
3. **Performance**: Smooth 60fps animations and fast load times
4. **User Experience**: Intuitive interactions and visual feedback
5. **Modern Standards**: Latest web technologies and best practices

## 📊 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: CSS Grid, Custom Properties, Vibration API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the classic tic-tac-toe game
- Built with modern web technologies
- Designed with mobile-first principles
- Accessibility guidelines from WCAG 2.1

---

**[🎮 Play Now](https://snowonacactus.github.io/tictactoe-mobile-first/)** | **[📱 View on Mobile](https://snowonacactus.github.io/tictactoe-mobile-first/)**
