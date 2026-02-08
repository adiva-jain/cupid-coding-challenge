// Three.js Sci-Fi Background with metallic hearts and starfield
(function () {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 40;

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

    // Geometry
    const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
        depth: 0.4,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    });

    const hearts = [];
    const colors = [0xff2d75, 0xff003c, 0xffffff, 0xff5e62];

    // Create metallic hearts
    for (let i = 0; i < 30; i++) {
        const isWireframe = Math.random() > 0.7;
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: isWireframe ? 0.3 : 0.6,
            shininess: 200,
            specular: 0xffffff,
            wireframe: isWireframe
        });

        const heart = new THREE.Mesh(heartGeometry, material);
        heart.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 100);
        heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const scale = 0.8 + Math.random() * 1.5;
        heart.scale.set(scale, scale, scale);

        heart.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.01,
            floatSpeed: 0.005 + Math.random() * 0.015,
            floatOffset: Math.random() * Math.PI * 2,
            isWireframe: isWireframe
        };

        hearts.push(heart);
        scene.add(heart);
    }

    // Create Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starCoords[i] = (Math.random() - 0.5) * 400;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xff2d75, 1);
    mainLight.position.set(10, 20, 30);
    scene.add(mainLight);

    const redLight = new THREE.PointLight(0xff003c, 2, 100);
    redLight.position.set(-20, -10, 20);
    scene.add(redLight);

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        hearts.forEach(heart => {
            heart.rotation.y += heart.userData.rotationSpeed;
            heart.rotation.z += heart.userData.rotationSpeed * 0.5;
            heart.position.y += Math.sin(time + heart.userData.floatOffset) * heart.userData.floatSpeed;

            if (heart.userData.isWireframe) {
                heart.material.opacity = 0.2 + Math.abs(Math.sin(time * 2)) * 0.3;
            }
        });

        stars.rotation.y += 0.0002;
        camera.position.x = Math.sin(time * 0.1) * 8;
        camera.position.y = Math.cos(time * 0.15) * 5;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.threeScene = { scene, camera, renderer, hearts };
})();