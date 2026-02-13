// Love Maze Mini-Game
const LoveMaze = {
    active: false,
    playerPos: { x: 0, y: 0 },
    goalPos: { x: 7, y: 7 },
    canvas: null,
    ctx: null,
    cellSize: 50,
    maze: [
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 2]
    ],
    keyHandler: null,

    init() {
        this.canvas = document.getElementById('maze-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Close button
        document.querySelector('#maze-game-overlay .close-game-btn').addEventListener('click', () => {
            this.end(false);
        });
    },

    start() {
        Utils.showOverlay('maze-game-overlay');
        this.active = true;
        this.playerPos = { x: 0, y: 0 };

        this.draw();
        this.setupControls();
    },

    draw() {
        this.ctx.clearRect(0, 0, 400, 400);

        // Draw cells
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.maze[y][x] === 1) {
                    // Wall
                    this.ctx.fillStyle = '#764ba2';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                } else {
                    // Path
                    this.ctx.fillStyle = '#f8f8f8';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }

                // Grid lines
                this.ctx.strokeStyle = '#ddd';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        // Draw goal
        this.ctx.fillStyle = '#ff003c';
        this.ctx.font = 'bold 20px "VT323", monospace';
        this.ctx.fillText('GOAL', this.goalPos.x * this.cellSize + 8, this.goalPos.y * this.cellSize + 32);

        // Draw player (Heart)
        const px = this.playerPos.x * this.cellSize + this.cellSize / 2;
        const py = this.playerPos.y * this.cellSize + this.cellSize / 2 + 2;
        const size = 30;

        this.ctx.fillStyle = '#ff2d75';
        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        this.ctx.moveTo(px, py + size * 0.2);
        this.ctx.bezierCurveTo(
            px, py - topCurveHeight,
            px - size / 2, py - topCurveHeight,
            px - size / 2, py + size * 0.2
        );
        this.ctx.bezierCurveTo(
            px - size / 2, py + size * 0.4,
            px, py + size * 0.6,
            px, py + size * 0.8
        );
        this.ctx.bezierCurveTo(
            px, py + size * 0.6,
            px + size / 2, py + size * 0.4,
            px + size / 2, py + size * 0.2
        );
        this.ctx.bezierCurveTo(
            px + size / 2, py - topCurveHeight,
            px, py - topCurveHeight,
            px, py + size * 0.2
        );
        this.ctx.fill();
    },

    setupControls() {
        this.keyHandler = (e) => {
            if (!this.active) return;

            let dx = 0, dy = 0;

            switch (e.key.toLowerCase()) {
                case 'arrowup':
                case 'w':
                    dy = -1;
                    break;
                case 'arrowdown':
                case 's':
                    dy = 1;
                    break;
                case 'arrowleft':
                case 'a':
                    dx = -1;
                    break;
                case 'arrowright':
                case 'd':
                    dx = 1;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            this.movePlayer(dx, dy);
        };

        document.addEventListener('keydown', this.keyHandler);
    },

    movePlayer(dx, dy) {
        const newX = this.playerPos.x + dx;
        const newY = this.playerPos.y + dy;

        // Check boundaries and walls
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && this.maze[newY][newX] !== 1) {
            this.playerPos.x = newX;
            this.playerPos.y = newY;
            Utils.playBeep(400);
            this.draw();

            // Check if reached goal
            if (this.playerPos.x === this.goalPos.x && this.playerPos.y === this.goalPos.y) {
                setTimeout(() => this.end(true), 300);
            }
        }
    },

    end(won = false) {
        this.active = false;
        Utils.hideOverlay('maze-game-overlay');

        // Remove key handler
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
            this.keyHandler = null;
        }

        if (won) {
            Utils.showMessage("You found the love!");
            GameState.addCharm(75);
            Utils.playBeep(1200);
        } else {
            GameState.addCharm(25);
        }

        setTimeout(() => {
            GameState.isChasing = true;
            ButtonController.startChase();
        }, 3000);
    }
};