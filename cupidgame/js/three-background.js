// Three.js 3D Background with floating hearts
(function () {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 30;

    // Create heart shape
    function createHeartShape() {
        const heartShape = new THREE.Shape();
        const x = 0, y = 0;
        heartShape.moveTo(x + 0.5, y + 0.5);
        heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
        heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
        heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
        heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
        heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
        heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
        return heartShape;
    }

    // Create hearts
    const hearts = [];
    const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    });

    const colors = [0xff6b9d, 0xf093fb, 0xfed6e3, 0xff69b4, 0xffa8c5];

    for (let i = 0; i < 25; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.4,
            shininess: 100
        });

        const heart = new THREE.Mesh(heartGeometry, material);

        // Random position
        heart.position.x = (Math.random() - 0.5) * 100;
        heart.position.y = (Math.random() - 0.5) * 100;
        heart.position.z = (Math.random() - 0.5) * 100;

        // Random rotation
        heart.rotation.x = Math.random() * Math.PI;
        heart.rotation.y = Math.random() * Math.PI;

        // Random scale
        const scale = 0.5 + Math.random() * 1;
        heart.scale.set(scale, scale, scale);

        // Store animation properties
        heart.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.01,
            floatSpeed: 0.01 + Math.random() * 0.02,
            floatOffset: Math.random() * Math.PI * 2
        };

        hearts.push(heart);
        scene.add(heart);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff6b9d, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf093fb, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        hearts.forEach((heart, index) => {
            // Rotate
            heart.rotation.y += heart.userData.rotationSpeed;
            heart.rotation.x += heart.userData.rotationSpeed * 0.5;

            // Float up and down
            heart.position.y += Math.sin(time + heart.userData.floatOffset) * heart.userData.floatSpeed;

            // Gentle drift
            heart.position.x += Math.cos(time * 0.5 + heart.userData.floatOffset) * 0.005;
        });

        // Rotate camera slightly
        camera.position.x = Math.sin(time * 0.1) * 5;
        camera.position.y = Math.cos(time * 0.15) * 3;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Expose for potential interaction
    window.threeScene = { scene, camera, renderer, hearts };
})();