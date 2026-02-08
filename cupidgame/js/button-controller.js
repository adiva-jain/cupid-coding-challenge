// Button Controller - handles YES and NO button behavior
const ButtonController = {
    yesButton: null,
    noButton: null,
    buttonPosition: { x: 0, y: 0 },
    chaseAngle: 0,

    init() {
        this.yesButton = document.getElementById('yes-button');
        this.noButton = document.getElementById('no-button');

        // YES button click
        this.yesButton.addEventListener('click', () => {
            const rect = this.yesButton.getBoundingClientRect();
            Utils.spawnParticles(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                '💖',
                15
            );
            Utils.playBeep(1200);
            setTimeout(() => this.showEnding(), 500);
        });

        // NO button click
        this.noButton.addEventListener('click', (e) => {
            e.preventDefault();
            GameState.noClickCount++;
            GameState.addCharm(10);

            const rect = this.noButton.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            Utils.spawnParticles(centerX, centerY, '💕', 12);

            Utils.showMessage(GameState.getMessage());

            // Start chase after first click
            if (GameState.noClickCount === 1) {
                setTimeout(() => this.startChase(), 500);
            }

            // Show mini-game after 5 clicks, then every 3
            if (GameState.noClickCount >= 5 && (GameState.noClickCount - 5) % 3 === 0) {
                this.showMiniGameChoice();
            }

            this.growYesButton();
            Utils.playBeep();
        });

        // NO button hover
        this.noButton.addEventListener('mouseenter', (e) => {
            if (!GameState.isChasing) {
                const rect = this.noButton.getBoundingClientRect();
                Utils.spawnParticles(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    '✨',
                    6
                );
            }
        });

        // Give up button
        const giveUpButton = document.getElementById('give-up-button');
        giveUpButton.addEventListener('click', () => {
            this.showEnding();
        });

        // Show give up button after 2 minutes
        setTimeout(() => {
            giveUpButton.style.opacity = 1;
        }, 120000);
    },

    // Start the chase - NO button moves in circle around center
    startChase() {
        if (GameState.isChasing) return;
        GameState.isChasing = true;
        this.noButton.classList.remove('wiggling');

        const animate = () => {
            if (!GameState.isChasing) return;

            // Smooth circular motion around screen center
            this.chaseAngle += 0.025; // Slower, smoother
            const radius = 200 + GameState.noButtonPhase * 20;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            this.buttonPosition.x = centerX + Math.cos(this.chaseAngle) * radius;
            this.buttonPosition.y = centerY + Math.sin(this.chaseAngle) * radius;

            this.noButton.style.position = 'fixed';
            this.noButton.style.left = (this.buttonPosition.x - this.noButton.offsetWidth / 2) + 'px';
            this.noButton.style.top = (this.buttonPosition.y - this.noButton.offsetHeight / 2) + 'px';

            // Create heart trail
            Utils.createHeartTrail(this.buttonPosition.x, this.buttonPosition.y);

            requestAnimationFrame(animate);
        };
        animate();
    },

    // Grow YES button over time
    growYesButton() {
        GameState.yesButtonSize = Math.min(GameState.yesButtonSize + 0.03, 1.5);
        this.yesButton.style.transform = `scale(${GameState.yesButtonSize})`;
    },

    // Show mini-game choice modal
    showMiniGameChoice() {
        GameState.isChasing = false;
        Utils.showOverlay('mini-game-overlay');
    },

    // Show ending screen
    showEnding() {
        const ending = document.getElementById('ending');
        ending.classList.add('active');
        Utils.playBeep(1500);
        SceneManager.createConfetti();

        // Create heart explosions
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                Utils.spawnParticles(x, y, ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)], 8);
            }
        }, 400);
    }
};