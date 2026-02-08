// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scene decorations
    SceneManager.init();

    // Initialize button controller
    ButtonController.init();

    // Initialize mini-games
    HeartCatcher.init();
    MemoryMatch.init();
    LoveMaze.init();

    // Setup mini-game selector
    document.querySelectorAll('.game-choice').forEach(button => {
        button.addEventListener('click', (e) => {
            const game = e.target.dataset.game;
            Utils.hideOverlay('mini-game-overlay');

            // Small delay before starting game
            setTimeout(() => {
                if (game === 'hearts') {
                    HeartCatcher.start();
                } else if (game === 'memory') {
                    MemoryMatch.start();
                } else if (game === 'maze') {
                    LoveMaze.start();
                }
            }, 300);
        });
    });

    console.log('💖 Valentine Game Initialized! 💖');
});