import * as THREE from "three";

export default function createFlameParticleSystem(particleCount = 2000, color = new THREE.Color("red")) {
    // Create geometry and its attributes
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifespans = new Float32Array(particleCount);

    // Sphere parameters
    const radius = 10;
    for (let i = 0; i < particleCount; i++) {
        // Random spherical coordinates
        const theta = Math.random() * 2 * Math.PI; // Angle around the Z-axis
        const phi = Math.acos(2 * Math.random() - 1); // Angle from the Z-axis

        // Convert spherical coordinates to Cartesian coordinates
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = radius * Math.cos(phi); // z

        // Velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.5; // velocity x
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // velocity y
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // velocity z

        // Lifespans
        lifespans[i] = Math.random() * 5 + 1;

        // Colors
        colors[i * 3] = color.r; // r
        colors[i * 3 + 1] = color.g; // g
        colors[i * 3 + 2] = color.b; // b
    }

    // Set attributes for the particles
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particles.setAttribute('lifespan', new THREE.BufferAttribute(lifespans, 1));

    const textureLoader = new THREE.TextureLoader();
    const flameTexture = textureLoader.load("/textures/suns.png", (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
    });


    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
        size:0.16, // Adjust size if needed
        map: flameTexture,
        vertexColors: true,
        blending: THREE.AdditiveBlending    ,
        transparent: true,
        alphaTest: 0.1 // Ensure this is appropriate for your texture
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    return particleSystem;
}
