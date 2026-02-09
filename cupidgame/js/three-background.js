// Three.js Sci-Fi Background with Puffy Hearts and Constellations
(function () {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 50;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    });

    // Create heart shape
    function createHeartShape() {
        const heartShape = new THREE.Shape();
        const x = 0, y = 0;
        // Smoother curves for rounded look
        heartShape.moveTo(x + 0.5, y + 0.5);
        heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
        heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
        heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
        heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
        heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
        heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
        return heartShape;
    }

    // Geometry - Rounded Wireframe (Less Thick)
    const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
        depth: 0.4, // Less thick as requested
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 2,
        bevelSize: 0.3,
        bevelThickness: 0.3,
        curveSegments: 20
    });

    const hearts = [];
    const colors = [0xff2d75, 0xff003c, 0xffffff, 0xff5e62];

    // Create hearts (Reduced count for less clutter)
    for (let i = 0; i < 35; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.25, // More subtle
            shininess: 120,
            specular: 0xffffff,
            wireframe: true,
            side: THREE.DoubleSide
        });

        const heart = new THREE.Mesh(heartGeometry, material);

        // Varied sizes: Some tiny, some huge
        const scale = 0.5 + Math.random() * 5.5;
        heart.scale.set(scale, scale, scale);

        // Spread out more
        heart.position.set(
            (Math.random() - 0.5) * 250,
            (Math.random() - 0.5) * 250,
            (Math.random() - 0.5) * 150
        );

        heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

        heart.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.005,
            floatSpeed: 0.002 + Math.random() * 0.008,
            floatOffset: Math.random() * Math.PI * 2,
            originalScale: scale
        };

        hearts.push(heart);
        scene.add(heart);
    }

    // Create Heart Constellations (More sparse, constellation-like)
    const constellations = [];
    function createHeartConstellation(xC, yC, zC, scale) {
        const group = new THREE.Group();
        const points = [];
        const starGeom = new THREE.BufferGeometry();
        const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.9 });

        // Generate fewer points for a "constellation" look (not a solid line)
        // Heart curve formula: 
        // x = 16sin^3(t)
        // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)

        const segments = 12; // Only 12 stars per heart
        for (let i = 0; i < segments; i++) {
            const t = (i / segments) * Math.PI * 2;

            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

            // Scale down the formula
            x *= 0.1;
            y *= 0.1;

            // Add slight jitter so it looks natural
            x += (Math.random() - 0.5) * 0.2;
            y += (Math.random() - 0.5) * 0.2;

            points.push(new THREE.Vector3(x, y, 0));
        }

        // Close loop
        points.push(points[0]);

        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 }); // Faint lines
        const line = new THREE.Line(lineGeom, lineMat);

        // Add stars at points
        const stars = new THREE.Points(lineGeom, starMat);

        group.add(line);
        group.add(stars);

        group.position.set(xC, yC, zC);
        group.scale.set(scale, scale, scale);
        group.rotation.z = (Math.random() - 0.5) * 0.5;

        scene.add(group);
        constellations.push(group);
    }

    // Add Constellations (Varied sizes)
    for (let i = 0; i < 6; i++) {
        createHeartConstellation(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 100,
            3 + Math.random() * 4 // Big constellations
        );
    }

    // Standard Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starCoords[i] = (Math.random() - 0.5) * 600;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.6 });
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
        time += 0.005;

        targetX = mouseX * 0.05;
        targetY = mouseY * 0.05;

        hearts.forEach(heart => {
            heart.rotation.y += heart.userData.rotationSpeed;
            heart.rotation.z += heart.userData.rotationSpeed * 0.5;
            heart.position.y += Math.sin(time + heart.userData.floatOffset) * heart.userData.floatSpeed;

            const pulse = 1 + Math.sin(time * 1.5 + heart.userData.floatOffset) * 0.05;
            heart.scale.set(
                heart.userData.originalScale * pulse,
                heart.userData.originalScale * pulse,
                heart.userData.originalScale * pulse
            );
        });

        constellations.forEach(group => {
            group.rotation.z += 0.0005;
        });

        stars.rotation.y += 0.0002;
        stars.rotation.x += (mouseY * 0.00005);

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.threeScene = { scene, camera, renderer, hearts };
})();