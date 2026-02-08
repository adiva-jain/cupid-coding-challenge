# 💖 Will You Be My Valentine? - Interactive Game

A delightful, fun-first Valentine's Day game where the "No" button playfully runs away, leading to entertaining mini-games and progressive rewards.

## 🎮 Features

### Core Gameplay
- **Charming Proposal**: Beautiful scene with glowing YES button and playful NO button
- **Playful Chase**: NO button moves in predictable circular patterns around screen center
- **Progressive Rewards**: Unlock heart trails, decorations, and special effects
- **Positive Reinforcement**: Every action creates something cute and delightful

### Mini-Games
1. **Heart Catcher** 💕 - Catch falling hearts with your basket
2. **Memory Match** 🎴 - Match pairs of adorable emojis  
3. **Love Maze** 🌹 - Navigate through a maze to find love

### Visual Excellence
- **Three.js 3D Background**: Beautiful floating 3D hearts
- **Smooth Animations**: Professional CSS animations throughout
- **Particle Effects**: Hearts, sparkles, and confetti
- **Responsive Design**: Works on all screen sizes

## 📁 Project Structure

```
valentine-game/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Core styling and layout
│   ├── animations.css     # All animation keyframes
│   └── games.css          # Mini-game specific styles
└── js/
    ├── three-background.js    # Three.js 3D heart background
    ├── utils.js               # Utility functions (particles, sounds)
    ├── game-state.js          # Game state management
    ├── scene-manager.js       # Background decorations
    ├── button-controller.js   # YES/NO button behavior
    ├── heart-catcher.js       # Heart Catcher mini-game
    ├── memory-match.js        # Memory Match mini-game
    ├── love-maze.js           # Love Maze mini-game
    └── main.js                # Initialization
```

## 🚀 How to Run

Simply open `index.html` in any modern web browser. No build process required!

```bash
# Option 1: Direct file
open index.html

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎯 Game Phases

### Phase 1: The Charming Proposal
- Beautiful gradient background with 3D floating hearts
- Large glowing YES button
- Small wiggling NO button

### Phase 2: The Playful Chase
- NO button runs away in smooth circular motion
- Creates heart trails as it moves
- Encouraging messages appear

### Phase 3: Mini-Game Rewards
- After 5 NO clicks, unlock mini-games
- Games appear every 3 clicks after that
- Win rewards and charm points

### Phase 4: Progressive Unlocks
- **50 charm**: Heart trail unlocked
- **100 charm**: Top hat decoration 🎩
- **200 charm**: Bow tie decoration 🎀
- **300 charm**: Crown decoration 👑

### Phase 5: Sweet Surrender
- YES button grows over time
- "Take me to YES" button appears after 2 minutes
- Beautiful ending with confetti and heart explosions

## 🎨 Design Philosophy

### Empowerment Over Punishment
Players always feel in control and can click YES at any time.

### Delightful Chaos
Effects are entertaining to watch, never frustrating.

### Progressive Rewards
Each "No" attempt reveals something charming.

### Easy Escape
YES is always clearly accessible and becomes more appealing over time.

## 💻 Technical Details

- **No dependencies** (except Three.js from CDN)
- **Pure vanilla JavaScript** - no frameworks
- **Modern CSS** with custom properties and animations
- **Responsive overlays** with proper z-index management
- **Optimized animations** using requestAnimationFrame

## 🎵 Audio

Simple Web Audio API beeps for interactions:
- Higher pitch for positive actions
- Pleasant tones for game events
- No external audio files needed

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🌟 Credits

Created with ❤️ following the "fun-first" game design philosophy.

Special thanks to:
- Three.js for the 3D graphics library
- Google Fonts for Poppins font

## 📝 License

Free to use for personal projects. Spread the love! 💕

---

**Made with 💖 for Valentine's Day**