// Utility Functions
const Utils = {
    // Spawn particle effects
    spawnParticles(x, y, emoji = '💖', count = 8) {
        const scene = document.getElementById('scene');
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = text;
            const angle = (Math.PI * 2 * i) / count;
            const distance = 30 + Math.random() * 40;
            particle.style.left = (x + Math.cos(angle) * distance) + 'px';
            particle.style.top = (y + Math.sin(angle) * distance) + 'px';
            scene.appendChild(particle);

            setTimeout(() => particle.remove(), 2500);
        }
    },

    // Create heart trail
    createHeartTrail(x, y) {
        if (!GameState.heartTrailEnabled) return;

        const scene = document.getElementById('scene');
        const trail = document.createElement('div');
        trail.className = 'heart-trail';
        trail.textContent = 'o';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        scene.appendChild(trail);

        setTimeout(() => trail.remove(), 1200);
    },

    // Show temporary message
    showMessage(text) {
        const message = document.getElementById('message');
        message.textContent = text;
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.opacity = 0;
        }, 3000);
    },

    // Play sound effect
    playBeep(frequency = 800) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (e) {
            // Audio not supported
        }
    },

    // Show overlay
    showOverlay(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.classList.add('active');
        }
    },

    // Hide overlay
    hideOverlay(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
};