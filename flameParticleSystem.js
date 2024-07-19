import * as THREE from "three";


export default function createFlameParticleSystem(particleCount = 2000 , color = new THREE.Color("white")){

    //making a gemoetry and its positions
    const particles =  new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifespans = new Float32Array(particleCount * 3);


    //initializing the particles attributes
    for(let i = 0 ; i < particleCount; i++){
        positions[i * 3] = Math.random() * 2 - 1 ; // x axis
        positions[i * 3 + 1] = Math.random() * 2 - 1; // y axis
        positions[i * 3  + 2]= Math.random() * 2 - 1; //z axis

        // the velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.05; // velocity x
        velocities[i * 3 + 1] =(Math.random() - 0.5) * 0.05; // velocity y
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05; //velocity z

        //lifespans
        lifespans[i] = Math.random() * 5 + 1 ; 

        //colors
        colors[i * 3] = color.r; //r
        colors[i * 3 + 1] = color.g; //g
        colors[i * 3 + 2] = color.b; //b
    }


    //setting the attributes for the partciles
    particles.setAttribute('position', new THREE.BufferAttribute(positions , 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors , 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities , 3));
    particles.setAttribute('lifespan' , new THREE.BufferAttribute(lifespans , 1));

    //particleMaterial
    const particleMaterial = new THREE.PointsMaterial({
        size : 0.005,
        vertexColors : true,
        blending : THREE.AdditiveBlending,
        transparent: true
    })

    const particleSystem = new THREE.Points(particles , particleMaterial);
    return particleSystem


}