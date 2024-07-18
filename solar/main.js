import './style.css'
import * as THREE from "three";
import getStarfield from '../getStarfield';
import createParticleSystem from '../particleSystem';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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

//making a function to stop zooming and in the canvas
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom = false;

// this event listner prevent us from zooming in
window.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();  // Prevent zooming via Ctrl + Mouse Wheel
  }
}, { passive: false });




//rendering it in a function]
function animate(){
  requestAnimationFrame(animate)
  stars.rotation.y += 0.0001; // Rotate the starfield
  particleSystem.rotation.z += 0.0001;
  renderer.render(scene, camera)
}

animate()

