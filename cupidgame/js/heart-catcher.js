// Heart Catcher Mini-Game
const HeartCatcher = {
    score: 0,
    active: false,
    basket: null,
    gameArea: null,

    init() {
        this.basket = document.getElementById('basket');
        this.gameArea = document.getElementById('heart-catcher-area');

        // Close button
        document.querySelector('#heart-catcher-overlay .close-game-btn').addEventListener('click', () => {
            this.end();
        });
    },

    start() {
        Utils.showOverlay('heart-catcher-overlay');
        this.active = true;
        this.score = 0;
        document.getElementById('game-score').textContent = `Score: ${this.score}`;

        let basketX = 230;

        // Mouse control for basket
        const mouseMoveHandler = (e) => {
            if (!this.active) return;
            const rect = this.gameArea.getBoundingClientRect();
            basketX = Math.max(45, Math.min(460, e.clientX - rect.left - 45));
            this.basket.style.left = basketX + 'px';
        };

        this.gameArea.addEventListener('mousemove', mouseMoveHandler);

        // Spawn falling hearts
        const spawnHeart = () => {
            if (!this.active) return;

            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
            heart.style.left = (50 + Math.random() * 450) + 'px';
            heart.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
            this.gameArea.appendChild(heart);

            const checkCollision = setInterval(() => {
                if (!this.active) {
                    clearInterval(checkCollision);
                    return;
                }

                const heartRect = heart.getBoundingClientRect();
                const basketRect = this.basket.getBoundingClientRect();

                if (heartRect.bottom >= basketRect.top - 15 &&
                    heartRect.left < basketRect.right - 15 &&
                    heartRect.right > basketRect.left + 15 &&
                    heartRect.top < basketRect.bottom) {
                    this.score += 10;
                    document.getElementById('game-score').textContent = `Score: ${this.score}`;
                    heart.remove();
                    clearInterval(checkCollision);
                    Utils.playBeep(600);

                    // Visual feedback
                    Utils.spawnParticles(basketRect.left + 45, basketRect.top, '✨', 5);
                }

                if (heartRect.top > window.innerHeight) {
                    clearInterval(checkCollision);
                }
            }, 30);

            setTimeout(() => {
                if (heart.parentNode) heart.remove();
                clearInterval(checkCollision);
            }, 6000);

            if (this.active) {
                setTimeout(spawnHeart, 700);
            }
        };

        spawnHeart();

        // End game after 20 seconds
        setTimeout(() => {
            if (this.active) {
                this.end(true);
            }
        }, 20000);
    },

    end(completed = false) {
        this.active = false;
        Utils.hideOverlay('heart-catcher-overlay');

        // Clear falling hearts
        const hearts = document.querySelectorAll('.falling-heart');
        hearts.forEach(heart => heart.remove());

        if (completed) {
            GameState.addCharm(this.score);
            Utils.showMessage(`Amazing! You caught ${this.score / 10} hearts! 🎉`);
        } else {
            GameState.addCharm(Math.floor(this.score / 2));
        }

        setTimeout(() => {
            GameState.isChasing = true;
            ButtonController.startChase();
        }, 3000);
    }
};