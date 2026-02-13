// Game State Management
const GameState = {
    charmScore: 0,
    noClickCount: 0,
    isChasing: false,
    noButtonPhase: 0,
    yesButtonSize: 1,
    heartTrailEnabled: false,
    gameStartTime: Date.now(),

    // Update charm score
    addCharm(points) {
        this.charmScore += points;
        const charmScoreEl = document.getElementById('charm-score');
        charmScoreEl.textContent = `Charm: ${this.charmScore}`;

        // Unlock heart trail
        if (this.charmScore >= 50 && !this.heartTrailEnabled) {
            this.heartTrailEnabled = true;
            Utils.showMessage("Heart trail unlocked!");
        }

        // Unlock decorations
        if (this.charmScore >= 100 && this.noButtonPhase < 1) {
            this.noButtonPhase = 1;
            // Cute SVG Hat
            const hatSVG = `
            <svg width="40" height="40" viewBox="0 0 100 100" style="filter: drop-shadow(0 0 5px #ff2d75);">
                <path d="M10,80 L90,80 L90,95 L10,95 Z" fill="#ff2d75" /> <!-- Brim -->
                <path d="M25,80 L25,30 C25,10 75,10 75,30 L75,80 Z" fill="#ff003c" /> <!-- Top -->
                <rect x="25" y="65" width="50" height="15" fill="#ffffff" /> <!-- Band -->
            </svg>`;

            const decoration = document.createElement('div');
            decoration.className = 'button-decoration';
            decoration.innerHTML = hatSVG;
            decoration.style.left = '-20px';
            decoration.style.top = '-45px';
            decoration.style.padding = '0';
            decoration.style.background = 'transparent';
            decoration.style.border = 'none';
            decoration.style.boxShadow = 'none';
            decoration.style.animation = 'none'; // Static cute hat

            const noButton = document.getElementById('no-button');
            noButton.appendChild(decoration);

            // this.addButtonDecoration('🎩', -15, -35); // Replaced with custom SVG
            Utils.showMessage("Nice! The NO button is getting fancy!");
        }
        if (this.charmScore >= 200 && this.noButtonPhase < 2) {
            this.noButtonPhase = 2;
            this.addButtonDecoration('🎀', 15, -35);
            Utils.showMessage("Even fancier now!");
        }
        if (this.charmScore >= 300 && this.noButtonPhase < 3) {
            this.noButtonPhase = 3;
            this.addButtonDecoration('👑', 0, -40);
            Utils.showMessage("Royalty!");
        }
    },

    // Add decoration to NO button
    addButtonDecoration(content, leftOffset = 0, topOffset = -30, isHTML = false) {
        const noButton = document.getElementById('no-button');
        const decoration = document.createElement('div');
        decoration.className = 'button-decoration';

        if (isHTML) {
            decoration.innerHTML = content;
            decoration.style.padding = '0';
            decoration.style.background = 'transparent';
            decoration.style.border = 'none';
            decoration.style.boxShadow = 'none';
            decoration.style.animation = 'none';
        } else {
            decoration.textContent = content;
        }

        decoration.style.left = leftOffset + 'px';
        decoration.style.top = topOffset + 'px';
        noButton.appendChild(decoration);
    },

    // Get encouraging messages
    getMessage() {
        const messages = [
            "Trying to escape, are we?",
            "Your determination is kind of adorable",
            "I admire your commitment to the chase!",
            "Still running? How romantic!",
            "You're making this so much fun!",
            "Watching you play makes me smile",
            "This is actually pretty entertaining!",
            "You're really good at this game!",
            "Having fun yet?",
            "I could do this all day!"
        ];

        return messages[Math.min(this.noClickCount - 1, messages.length - 1)];
    }
};