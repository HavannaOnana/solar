import './style.css'
import * as THREE from "three";
import getStarfield from '../getStarfield';
import createParticleSystem from '../particleSystem';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { getFresnelMat } from '../getFresnelMat';
import { color } from 'three/examples/jsm/nodes/Nodes.js';
import createFlameParticleSystem from '../flameParticleSystem';

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
camera.position.z = 5

//making a scene 
const scene = new THREE.Scene();

//adding stars to the 
const stars = new getStarfield({numStars : 5000})
scene.add(stars)

scene.fog = new THREE.FogExp2(0x000000, 0.05); // Fog with exponential decay

//adding particles
const particleColor = new THREE.Color("white");
const particleSystem = createParticleSystem(666 , particleColor);
particleSystem.scale.set(4,4,4)
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


//the planets
const loader = new THREE.TextureLoader();

//the sun
const sunGroup = new THREE.Group()
sunGroup.position.x = 0
sunGroup.rotation.z = -24.7 * Math.PI / 360 ;
scene.add(sunGroup)

//sun geometry
const sunGeometry = new THREE.IcosahedronGeometry(1,20);
const sunMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/thesun.png"),
  color : "yellow"
})

const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
sunMesh.scale.set(1, 1, 1);
sunGroup.add(sunMesh)

const sunfrestMal = new getFresnelMat({rimHex : "orangered" , facingHex : "red"});
const sunGlowMesh = new THREE.Mesh(sunGeometry , sunfrestMal);
sunGlowMesh.scale.setScalar(1.03)
sunGroup.add(sunGlowMesh)

//adding the dakr spots to the sun for more realism
const sunDarkLight =  new THREE.MeshBasicMaterial({
  map : loader.load("/textures/clouds.jpg"),
  blending : THREE.AdditiveBlending,
  color : "#820300",

})

const sunDarkLightMesh = new THREE.Mesh(sunGeometry,sunDarkLight);
sunDarkLightMesh.scale.setScalar(1.01)
sunGroup.add(sunDarkLightMesh)

//adding particle to it
const flameParticleSystem = new createFlameParticleSystem(1099, new THREE.Color("orangered"));
flameParticleSystem.scale.set(0.1, 0.01,0.01); 
sunGroup.add(flameParticleSystem);


//rendering it in a function]
function animate(){
  requestAnimationFrame(animate)
  stars.rotation.y += 0.0001; // Rotate the starfield
  particleSystem.rotation.z += 0.0001;
  // rotation of the sun
  sunGroup.rotation.z += 0.0001;
  renderer.render(scene, camera)
}

animate()

