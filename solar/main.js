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
camera.position.z = 3
//camera.position.x = 5

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
sunGroup.position.x = -15;
sunGroup.rotation.z = -24.7 * Math.PI / 360 ;
scene.add(sunGroup)

//sun geometry
const sunGeometry = new THREE.IcosahedronGeometry(1,20);
const sunMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/thesun.png"),
  color : "yellow"
});

const sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
sunMesh.scale.set(1, 1, 1);
sunGroup.add(sunMesh);

const sunfrestMal = new getFresnelMat({rimHex : "gold" , facingHex : "orangered"});
const sunGlowMesh = new THREE.Mesh(sunGeometry , sunfrestMal);
sunGlowMesh.scale.setScalar(1.05)
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
const flameParticleSystem = new createFlameParticleSystem(9000, new THREE.Color("orangered"));
flameParticleSystem.scale.set(0.1, 0.1, 0.12); // Increase scale
// Adjust particle material for stronger glow
//flameParticleSystem.material.size = 1; // Increase particle size
flameParticleSystem.material.opacity = 1
sunGroup.add(flameParticleSystem);




// making the moon
const moonGroup = new THREE.Group();
moonGroup.position.x = -10;
moonGroup.rotation.z = -27.3 * Math.PI / 360 ;
scene.add(moonGroup);

const moonGeometry = new THREE.IcosahedronGeometry(1,20);
const moonMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/moon.jpg"),
  color : "white"
})

const moonMesh = new THREE.Mesh(moonGeometry,moonMaterial);
moonGroup.add(moonMesh);




//making venus
const venusGroup = new THREE.Group();
venusGroup.position.x = -5;
venusGroup.rotation.z = -243 * Math.PI / 220;
scene.add(venusGroup);

const venusGeometry = new THREE.IcosahedronGeometry(1,20);
const venusMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/venus.jpg"),
})
const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
venusGroup.add(venusMesh);

const venusfrestMel = new getFresnelMat({rimHex : "beige" , facingHex : "beige"});
const venusGlowMesh = new THREE.Mesh(venusGeometry , venusfrestMel)
venusGlowMesh.scale.setScalar(1.01)
venusGroup.add(venusGlowMesh)


//making the earth
const earthGroup = new THREE.Group();
earthGroup.position.x = 0;
earthGroup.rotation. z = -23.7 * Math.PI / 360;
scene.add(earthGroup);

const earthGeometry = new THREE.IcosahedronGeometry(1,20);
const earthMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/earthy.jpg"),
})

const earthMesh = new THREE.Mesh(earthGeometry , earthMaterial);
earthMesh.scale.setScalar(1.001)
earthGroup.add(earthMesh);


//adding the night version
const earthNightlight = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/earthdark.png"),
  blending : THREE.AdditiveBlending,
  transparent : true,
})

//adding the mesh of the earthNightlight
const earthNightlightMesh = new THREE.Mesh(earthGeometry,earthNightlight);
earthGroup.add(earthNightlightMesh);

//adding clouds
const earthClouds = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/clouds.jpg"),
  blending : THREE.AdditiveBlending,
  transparent : true
})
// adding clouds mesh
const earthCloudsMesh = new THREE.Mesh(earthGeometry,earthClouds);
earthCloudsMesh.scale.setScalar(1.005)
earthGroup.add(earthCloudsMesh);

//adding a glow to the earth
const earthfresnelMat = getFresnelMat();
const earthGlowMesh = new THREE.Mesh(earthGeometry,earthfresnelMat);
earthGlowMesh.scale.setScalar(1.01);
earthGroup.add(earthGlowMesh);





//rendering it in a function]
function animate(){
  requestAnimationFrame(animate)
  stars.rotation.y += 0.0001; // Rotate the starfield
  particleSystem.rotation.z += 0.0001;
  // rotation of the sun
  sunGroup.rotation.z += 0.0009;
  //rotation of the moon
  moonGroup.rotation.z += 0.0009
  // rotation of venus
  venusGroup.rotation.z += 0.0009
  //rotation of earth
  earthGroup.rotation.y += 0.0009
  renderer.render(scene, camera)
}

animate()

