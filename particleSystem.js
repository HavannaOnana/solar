//particle system
import * as THREE from "three";
import { color } from "three/examples/jsm/nodes/Nodes.js";

export default function createParticleSystem(particleCount = 20000 , color = new THREE.Color("white")){
    const particles = new THREE.BufferGeometry();
    const positions =  new Float32Array(particleCount * 5);
    const colors = new Float32Array(particleCount * 5);

    for(let i = 0; i < particleCount ; i++){
        positions[i * 3] = Math.random() * 2 - 1; //x
        positions[i * 3 + 1] = Math.random() * 2 - 1; //y
        positions[i * 3 + 2] = Math.random() * 2 - 1; //z

        colors[ i * 3] = color.r; //r
        colors[i * 3 + 1] = color.g; //g
        colors[i * 3 + 2 ] = color.b; //b
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions,3));
    particles.setAttribute('color' , new THREE.BufferAttribute(colors , 3));

    const particleMaterial = new THREE.PointsMaterial({
        size : 0.001,
        vertexColors : true,
        blending : THREE.AdditiveBlending,
        transparent : true
    })

    const particleSystem = new THREE.Points(particles , particleMaterial);
    return particleSystem;
}