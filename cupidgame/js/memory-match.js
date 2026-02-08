// Memory Match Mini-Game
const MemoryMatch = {
    emojis: ['Heart', 'Star', 'Circle', 'Square', 'Triangle', 'Diamond', 'Rose', 'Flower'],
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
        const pairs = [...this.emojis, ...this.emojis];
        pairs.sort(() => Math.random() - 0.5);

        const grid = document.getElementById('memory-grid');
        grid.innerHTML = '';
        this.cards = [];

        pairs.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.emoji = emoji;
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
        card.textContent = card.dataset.emoji;
        this.flippedCards.push(card);
        Utils.playBeep(800);

        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 800);
        }
    },

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
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
            card1.textContent = '';
            card2.textContent = '';
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