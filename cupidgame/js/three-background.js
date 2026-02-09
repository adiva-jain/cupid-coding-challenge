// Three.js Sci-Fi Background with geometric hearts and starfield
(function () {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 40;

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

    // Geometry - Rounded / High Poly look
    const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
        depth: 0.6,
        bevelEnabled: true,
        bevelSegments: 8, // Smooth bevel
        steps: 4, // Smoothing along depth
        bevelSize: 0.3,
        bevelThickness: 0.3,
        curveSegments: 20 // High curve segments for very round look
    });

    // Abstract geometric shapes to mix in (but keep them wireframe/rounded too)
    const geoGeometry = new THREE.IcosahedronGeometry(1, 2); // Higher detail

    const hearts = [];
    const colors = [0xff2d75, 0xff003c, 0xffffff, 0xff5e62];

    // Create hearts
    for (let i = 0; i < 50; i++) {
        const isGeo = Math.random() > 0.8; // Mostly round hearts
        const geometry = isGeo ? geoGeometry : heartGeometry;

        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.4,
            shininess: 100,
            specular: 0xffffff,
            wireframe: true, // WIREFRAME as requested
            flatShading: false, // SMOOTH, not flat/carved
            side: THREE.DoubleSide
        });

        const heart = new THREE.Mesh(geometry, material);

        // Remove the child wireframe since the main mesh is now wireframe
        // This prevents z-fighting or double-line look

        // Vary size significantly
        const scale = 0.5 + Math.random() * 3.5;
        heart.scale.set(scale, scale, scale);

        heart.position.set((Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160, (Math.random() - 0.5) * 120);
        heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

        heart.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.01, // Slower rotation for heavy carved objects
            floatSpeed: 0.005 + Math.random() * 0.015,
            floatOffset: Math.random() * Math.PI * 2,
            originalScale: scale
        };

        hearts.push(heart);
        scene.add(heart);
    }

    // Create Starfield - More stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starCoords[i] = (Math.random() - 0.5) * 500;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.7 });
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

        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;

        hearts.forEach(heart => {
            heart.rotation.y += heart.userData.rotationSpeed;
            heart.rotation.z += heart.userData.rotationSpeed * 0.5;
            heart.position.y += Math.sin(time + heart.userData.floatOffset) * heart.userData.floatSpeed;

            const pulse = 1 + Math.sin(time * 2 + heart.userData.floatOffset) * 0.1;
            heart.scale.set(
                heart.userData.originalScale * pulse,
                heart.userData.originalScale * pulse,
                heart.userData.originalScale * pulse
            );
        });

        stars.rotation.y += 0.0005;
        stars.rotation.x += (mouseY * 0.0001);

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