import './style.css'
import * as THREE from "three";
import getStarfield from '../getStarfield';
import createParticleSystem from '../particleSystem';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

//adding a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.outerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//making a camera
const fov = 60;
const aspect = window.innerWidth / window.outerHeight;
const near = 0.1;
const far = 700;

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z = 2;

//making a scene 
const scene = new THREE.Scene();

//adding stars to the 
const stars = new getStarfield({numStars : 5000})
scene.add(stars)

scene.fog = new THREE.FogExp2(0x000000, 0.05); // Fog with exponential decay

//adding particles
const particleColor = new THREE.Color("white");
const particleSystem = createParticleSystem(200 , particleColor);
scene.add(particleSystem);

// adding a post processing setup
 const composer = new EffectComposer(renderer);
 composer.addPass(new RenderPass(scene,camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth , window.outerHeight),
  1.5, 0.4, 0.85
);
composer.addPass(bloomPass);

//animate particle colors to create  a wavy effect
let time = 0;
const colors = particleSystem.geometry.attributes.color.array;


//rendering it in a function]
function animate(){
  requestAnimationFrame(animate)
  stars.rotation.y += 0.0001; // Rotate the starfield
  particleSystem.rotation.z += 0.0001;
  time += 0.01;
    for (let i = 0; i < colors.length; i += 3) {
        const colorValue = (Math.sin(time + i * 0.01) + 1) / 2; // Generate a wave effect
        colors[i] = colorValue;     // R
        colors[i + 1] = colorValue; // G
        colors[i + 2] = colorValue; // B
    }
    particleSystem.geometry.attributes.color.needsUpdate = true;
    composer.render();
}

animate()

