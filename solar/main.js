import './style.css'
import * as THREE from "three";


//adding a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.appendChild(renderer.domElement);

//making a camera
const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.postion = 2;

//making a scene 
const scene = new THREE.Scene();


//rendering it in a function]
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene,camera);
}

animate()

