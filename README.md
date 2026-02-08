# Valentine Game

This is a simple game for Valentine's Day where the No button moves away when you try to click it. It includes several mini games and rewards.

## Features

### Gameplay
* Proposal: A screen with Yes and No buttons.
* Chase: The No button moves in circular patterns.
* Rewards: Unlocks include trails and decorations.
* Feedback: Actions trigger visual effects and messages.

### Mini Games
1. Heart Catcher: Catch hearts in a basket.
2. Memory Match: Match pairs of icons.
3. Love Maze: Find your way through a maze.

### Visuals
* Three.js background: Floating 3D objects.
* Animations: CSS based movement.
* Particles: Effects for different actions.
* Responsive: Works on multiple screen sizes.

## Project Structure

valentine game/
* index.html: Main file
* styles/
  * main.css: Core styles
  * animations.css: Keyframes
  * games.css: Game styles
* js/
  * three background.js: Background logic
  * utils.js: Helper functions
  * game state.js: State management
  * scene manager.js: Background items
  * button controller.js: Button logic
  * heart catcher.js: Mini game logic
  * memory match.js: Mini game logic
  * love maze.js: Mini game logic
  * main.js: Entry point

## How to Run

Open index.html in a browser.

Option 1: Open the file directly.
Option 2: Use a local server like python.

## Game Phases

### Phase 1: The Proposal
* Gradient background with floating items.
* Yes button is large.
* No button wiggles.

### Phase 2: The Chase
* No button moves in a circle.
* Moving leaves a trail.
* Messages appear on screen.

### Phase 3: Mini Games
* Games unlock after 5 attempts to click No.
* A new game appears every 3 clicks after that.
* Win points to get rewards.

### Phase 4: Unlocks
* 50 points: Trail unlocked.
* 100 points: Hat decoration.
* 200 points: Bow decoration.
* 300 points: Crown decoration.

### Phase 5: Surrender
* Yes button grows over time.
* A button to skip appears after 2 minutes.
* Ending screen with particles.

## Design
* Control: The user can click Yes at any time.
* Effects: Visuals are meant to be lighthearted.
* Progression: Interactions reveal new items.
* Accessibility: Yes is always easy to find.

## Technical Details
* No dependencies besides Three.js from a CDN.
* Vanilla JavaScript.
* CSS for layout and animations.
* Overlays for game screens.

## Audio
* Uses Web Audio API.
* Tones for different events.
* No external files needed.

## Browser Support
* Chrome 90 plus.
* Firefox 88 plus.
* Safari 14 plus.
* Opera 76 plus.

## Credits
* Standard game design patterns.
* Three.js for graphics.
* Google Fonts for typography.

## License
* Free for personal use.

Made for Valentine's Day.