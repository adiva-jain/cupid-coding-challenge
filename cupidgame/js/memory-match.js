// Memory Match Mini-Game
const MemoryMatch = {
    emojiPairs: [
        { name: 'Heart', icon: '❤️' },
        { name: 'Star', icon: '⭐' },
        { name: 'Circle', icon: '🟣' },
        { name: 'Square', icon: '🟦' },
        { name: 'Triangle', icon: '🔺' },
        { name: 'Diamond', icon: '💎' },
        { name: 'Rose', icon: '🌹' },
        { name: 'Flower', icon: '🌸' }
    ],
    cards: [],
    flippedCards: [],
    matchedPairs: 0,

    init() {
        // Close button
        document.querySelector('#memory-game-overlay .close-game-btn').addEventListener('click', () => {
            this.end(false);
        });
    },

    start() {
        Utils.showOverlay('memory-game-overlay');
        this.matchedPairs = 0;
        this.flippedCards = [];

        // Create shuffled pairs
        const pairs = [...this.emojiPairs, ...this.emojiPairs];
        pairs.sort(() => Math.random() - 0.5);

        const grid = document.getElementById('memory-grid');
        grid.innerHTML = '';
        this.cards = [];

        pairs.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.name = item.name;
            card.dataset.icon = item.icon;
            card.dataset.index = index;
            card.addEventListener('click', () => this.flipCard(card));
            grid.appendChild(card);
            this.cards.push(card);
        });

        this.updateScore();
    },

    flipCard(card) {
        if (card.classList.contains('flipped') ||
            card.classList.contains('matched') ||
            this.flippedCards.length >= 2) return;

        card.classList.add('flipped');

        // Add content with structure for rotation fix
        card.innerHTML = `
            <div class="memory-card-content">
                <div class="memory-icon">${card.dataset.icon}</div>
                <div class="memory-name">${card.dataset.name}</div>
            </div>
        `;

        this.flippedCards.push(card);
        Utils.playBeep(800);

        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 800);
        }
    },

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.name === card2.dataset.name) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matchedPairs++;
            this.updateScore();
            Utils.playBeep(1000);
            GameState.addCharm(20);

            // Celebration effect
            const rect1 = card1.getBoundingClientRect();
            Utils.spawnParticles(rect1.left + 55, rect1.top + 55, '✨', 6);

            if (this.matchedPairs === 8) {
                setTimeout(() => this.end(true), 1000);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
        }

        this.flippedCards = [];
    },

    updateScore() {
        document.getElementById('memory-score').textContent = `Matches: ${this.matchedPairs}/8`;
    },

    end(completed = false) {
        Utils.hideOverlay('memory-game-overlay');

        if (completed) {
            Utils.showMessage("Perfect! You matched them all!");
            GameState.addCharm(50);
        } else {
            GameState.addCharm(this.matchedPairs * 10);
        }

        setTimeout(() => {
            GameState.isChasing = true;
            ButtonController.startChase();
        }, 3000);
    }
};