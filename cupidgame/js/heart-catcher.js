// Heart Catcher Mini-Game
const HeartCatcher = {
    score: 0,
    active: false,
    basket: null,
    gameArea: null,
    spawnInterval: null,
    checkIntervals: [],

    init() {
        this.basket = document.getElementById('basket');
        // Replace basket text with shape class if needed, or ensure CSS handles it
        this.basket.innerHTML = '';
        this.basket.classList.add('game-basket');

        this.gameArea = document.getElementById('heart-catcher-area');

        // Close button logic
        const closeBtn = document.querySelector('#heart-catcher-overlay .close-game-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.end(false);
            });
        }
    },

    start() {
        if (this.active) return;

        Utils.showOverlay('heart-catcher-overlay');
        this.active = true;
        this.score = 0;
        document.getElementById('game-score').textContent = `Score: ${this.score}`;

        // Reset basket position
        this.basket.style.left = '230px';

        // Mouse control for basket
        this.mouseMoveHandler = (e) => {
            if (!this.active) return;
            const rect = this.gameArea.getBoundingClientRect();
            // Center the basket on mouse
            let basketX = e.clientX - rect.left - 40; // 40 is half basket width

            // Constrain 
            basketX = Math.max(0, Math.min(this.gameArea.offsetWidth - 80, basketX));

            this.basket.style.left = basketX + 'px';
        };

        this.gameArea.addEventListener('mousemove', this.mouseMoveHandler);

        // Start spawning hearts
        this.spawnLoop();

        // End game after 20 seconds
        this.gameTimer = setTimeout(() => {
            if (this.active) {
                this.end(true);
            }
        }, 20000);
    },

    spawnLoop() {
        if (!this.active) return;

        this.spawnHeart();

        // Random spawn interval
        const nextSpawnTime = 600 + Math.random() * 800;
        this.spawnInterval = setTimeout(() => this.spawnLoop(), nextSpawnTime);
    },

    spawnHeart() {
        if (!this.active) return;

        const heart = document.createElement('div');
        heart.className = 'game-heart'; // Use CSS shape class

        // Random X position
        const maxLeft = this.gameArea.offsetWidth - 30; // 30 is heart width
        heart.style.left = Math.floor(Math.random() * maxLeft) + 'px';
        heart.style.top = '-30px';

        this.gameArea.appendChild(heart);

        // Falling animation via JS interval for collision detection accuracy
        const speed = 2 + Math.random() * 2;

        const moveInterval = setInterval(() => {
            if (!this.active) {
                clearInterval(moveInterval);
                if (heart.parentNode) heart.remove();
                return;
            }

            const currentTop = parseFloat(heart.style.top);
            const newTop = currentTop + speed;
            heart.style.top = newTop + 'px';

            // Check collision
            const heartRect = heart.getBoundingClientRect();
            const basketRect = this.basket.getBoundingClientRect();

            if (this.checkCollision(heartRect, basketRect)) {
                this.scoreCatch(heart, moveInterval);
            }

            // Remove if out of bounds
            if (newTop > this.gameArea.offsetHeight) {
                clearInterval(moveInterval);
                if (heart.parentNode) heart.remove();
            }
        }, 16); // ~60fps

        this.checkIntervals.push(moveInterval);
    },

    checkCollision(heartRect, basketRect) {
        return !(heartRect.right < basketRect.left ||
            heartRect.left > basketRect.right ||
            heartRect.bottom < basketRect.top + 20 || // Allow roughly hitting top of basket
            heartRect.top > basketRect.bottom);
    },

    scoreCatch(heart, interval) {
        this.score += 10;
        document.getElementById('game-score').textContent = `Score: ${this.score}`;

        // Visuals
        const rect = heart.getBoundingClientRect();
        Utils.spawnParticles(rect.left + 15, rect.top + 15, '+10', 5);
        Utils.playBeep(600 + (this.score * 10));

        clearInterval(interval);
        if (heart.parentNode) heart.remove();
    },

    end(completed) {
        this.active = false;
        Utils.hideOverlay('heart-catcher-overlay');

        // Cleanup listeners
        if (this.mouseMoveHandler) {
            this.gameArea.removeEventListener('mousemove', this.mouseMoveHandler);
        }

        // Cleanup timers
        clearTimeout(this.spawnInterval);
        clearTimeout(this.gameTimer);
        this.checkIntervals.forEach(interval => clearInterval(interval));
        this.checkIntervals = [];

        // Remove all hearts
        const hearts = document.querySelectorAll('.game-heart');
        hearts.forEach(h => h.remove());

        if (completed) {
            const charms = Math.floor(this.score / 2);
            GameState.addCharm(charms);
            // Show result via standard message
            setTimeout(() => {
                Utils.showMessage(`Time's up! You scored ${this.score}!`);
            }, 500);
        }

        // Return to main state
        setTimeout(() => {
            // Only restart chase if we haven't finished the main game
            if (!document.getElementById('ending').classList.contains('active')) {
                GameState.isChasing = true;
                ButtonController.startChase();
            }
        }, 1000);
    }
};