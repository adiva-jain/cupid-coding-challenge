// Scene Manager - handles background decorations
const SceneManager = {
    init() {
        const scene = document.getElementById('scene');

        // Add floating items in background
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = 'o';
            heart.style.left = (Math.random() * 100) + '%';
            heart.style.top = (Math.random() * 100) + '%';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            scene.appendChild(heart);
        }

        // Add decorative clouds
        for (let i = 0; i < 8; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'pixel-cloud';
            cloud.style.width = (80 + Math.random() * 70) + 'px';
            cloud.style.height = (40 + Math.random() * 35) + 'px';
            cloud.style.left = (Math.random() * 100) + '%';
            cloud.style.top = (Math.random() * 50) + '%';
            cloud.style.animationDelay = (Math.random() * 6) + 's';
            scene.appendChild(cloud);
        }
    },

    // Create confetti for ending
    createConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ff6b9d', '#f093fb', '#fed6e3', '#c94b76', '#ffa8c5'];

        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
                confetti.style.animationDelay = (Math.random() * 0.5) + 's';
                container.appendChild(confetti);

                setTimeout(() => confetti.remove(), 5000);
            }
        }, 200);
    }
};