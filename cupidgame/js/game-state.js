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
            this.addButtonDecoration('Hat', -15, -35);
            Utils.showMessage("Nice! The NO button is getting fancy!");
        }
        if (this.charmScore >= 200 && this.noButtonPhase < 2) {
            this.noButtonPhase = 2;
            this.addButtonDecoration('Bow', 15, -35);
            Utils.showMessage("Even fancier now!");
        }
        if (this.charmScore >= 300 && this.noButtonPhase < 3) {
            this.noButtonPhase = 3;
            this.addButtonDecoration('Crown', 0, -40);
            Utils.showMessage("Royalty!");
        }
    },

    // Add decoration to NO button
    addButtonDecoration(text, leftOffset = 0, topOffset = -30) {
        const noButton = document.getElementById('no-button');
        const decoration = document.createElement('div');
        decoration.className = 'button-decoration';
        decoration.textContent = text;
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