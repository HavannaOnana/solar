import './style.css'
import * as THREE from "three";
import getStarfield from '../getStarfield';
import createParticleSystem from '../particleSystem';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { getFresnelMat } from '../getFresnelMat';
import { color } from 'three/examples/jsm/nodes/Nodes.js';
import createFlameParticleSystem from '../flameParticleSystem';
import gsap from "gsap";


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
camera.position.z = 3.5
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
controls.enablePan = false;
controls.enableDamping = false;

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
sunGroup.position.x = 0;
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
moonGroup.position.x = 5;
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
venusGroup.position.x = 10;
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
earthGroup.position.x = 15;
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
})

//adding the mesh of the earthNightlight
const earthNightlightMesh = new THREE.Mesh(earthGeometry,earthNightlight);
earthGroup.add(earthNightlightMesh);

//adding clouds
const earthClouds = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/cloudss.png"),
  blending : THREE.AdditiveBlending,
  transparent : true,
  //color : "blue"
})
// adding clouds mesh
const earthCloudsMesh = new THREE.Mesh(earthGeometry,earthClouds);
earthCloudsMesh.scale.setScalar(1.001)
earthGroup.add(earthCloudsMesh);

//adding a glow to the earth
const earthfresnelMat = getFresnelMat();
const earthGlowMesh = new THREE.Mesh(earthGeometry,earthfresnelMat);
earthGlowMesh.scale.setScalar(1.01);
earthGroup.add(earthGlowMesh);


//making saturn
const saturnGroup = new THREE.Group();
saturnGroup.position.x = 20;
saturnGroup.rotation. z = -10.756 * Math.PI / 140;
scene.add(saturnGroup);

const saturnGeometry = new THREE.IcosahedronGeometry(1,20);
const saturnMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/saturn.jpg")
})

const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturnGroup.add(saturnMesh);

const saturnRingGeometry = new THREE.RingGeometry(1.2, 1.4, 100);;
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map : loader.load("/textures/saturnring.png"),
  side: THREE.DoubleSide
})

const saturnRingMesh = new THREE.Mesh(saturnRingGeometry,saturnRingMaterial);
saturnRingMesh.rotation.x = Math.PI / -2;
saturnRingMesh.position.y = 0;
saturnRingMesh.position.z = 0
saturnGroup.add(saturnRingMesh);


//the animations and text

//selecting the div suntext from the html
const sunText = document.querySelector('.suntext');

//selcting the explore button from the html
const sunTextExplore = document.querySelector('.explore');

//selecting the other div from the html
const planetText = document.querySelector('.planet_text');

//selecting the next button 
const nextButton = planetText.querySelector(".next");

//selecting the div with other texts
const otherPlanetTexts = document.querySelector('.otherplanettext');

//selecting the div that contains the elemets
const periodicElements = document.querySelector(".pmep-in .pmep-in-text");
const periodicElements1 = document.querySelector(".pmep-in .pmep-in-text1");


// The animation for the first scene
function beginningSun() {
  gsap.to(sunGroup.position, {
    duration: 1,
    x: 0,
    delay: 2,
    //removing 
    onUpdate: () => {
      if (Math.abs(sunGroup.position.x - 0) < 0.01) {
        sunText.classList.add('fade-in');
      }
    }
  });
}
beginningSun();

//the animation to introduce the second planet the moon;
function moonScene(){
  //the sun leaving the scene
  gsap.to(sunGroup.position,{
    duration:5,
    x : -8,
    delay : 2
  })

  //the moon coming into the scene
  gsap.to(moonGroup.position,{
    duration : 5,
    x : 1.5,
    delay : 2,
    onUpdate : ()=>{
      if(Math.abs(moonGroup.position.x - 1.5)< 0.01){
        console.log('Updating moon position and fading out sun text');
        sunText.classList.remove('fade-in');
        sunText.classList.add('fade-out');
        planetText.classList.add('fade-in')
      }
    }

  })
}

//adding an event listener to make sure that when i click on the button on line 225 the moon scene shows
sunTextExplore.addEventListener("click", function(){
  moonScene()
})


//adding venus to the scene in a function
function venusScene(){
  //the moon leaving the scene
  gsap.to(moonGroup.position,{
    duration : 5,
    x : -20,
    delay : 2

  })

  gsap.to(venusGroup.position,{
    duration : 5,
    x : 1.5,
    delay : 2,
    //updating the
    onUpdate : ()=>{
      if(Math.abs(venusGroup.position.x - 1.5) < 0.01){
        const venusContent = otherPlanetTexts.querySelector('.venus').innerHTML;
        planetText.classList.add('fade-in');
        planetText.querySelector(".planet_h1").textContent = "Venus";
        planetText.querySelector(".planet_p").innerHTML = venusContent;
        //editing the elements
        periodicElements.querySelector(".number").textContent = "7";
        periodicElements.querySelector(".alpha").textContent = "N";
        periodicElements.querySelector(".alpha-text").textContent = "Nitrogen";

        periodicElements1.querySelector(".number1").textContent = "6";
        periodicElements1.querySelector(".alpha1").textContent = "C";
        periodicElements1.querySelector(".alpha-text1").textContent = "Carbon";
      }
    } 

  })

}
//calling the function
nextButton.addEventListener("click" , function(){
  venusScene();
})


//making the earth scene
function earthScene(){
  //venus leaving the earth
  gsap.to(venusGroup.position,{
    duration : 5,
    x : -10,
    delay : 2
  })

  // earth coming to the scene
  gsap.to(earthGroup.position,{
    duration : 5,
    x : 1.5,
    delay : 2,
    //updating the scene
    onUpdate : ()=>{
      if(Math.abs(earthGroup.position.x - 1.5)< 0.01){
        const earthContent = otherPlanetTexts.querySelector('.earth').innerHTML;
        planetText.querySelector(".planet_h1").textContent = "Earth";
        planetText.querySelector(".planet_p").innerHTML = earthContent;

        //editing the elements
        periodicElements.querySelector(".number").textContent = "8";
        periodicElements.querySelector(".alpha").textContent = "O";
        periodicElements.querySelector(".alpha-text").textContent = "Oxygen";

        periodicElements1.querySelector(".number1").textContent = "11";
        periodicElements1.querySelector(".alpha1").textContent = "NA";
        periodicElements1.querySelector(".alpha-text1").textContent = "Sodium";

      }
    }
  })
}

// adding the saturn scene
function saturnScene(){
  //earth leaving the scene
  gsap.to(earthGroup.position,{
    duration : 5,
    x : -5 ,
    delay : 2
  })

  //adding the saturn
  gsap.to(saturnGroup.position,{
    duration : 5,
    x : 1.5,
    delay : 2,
    //updating the scene
    onUpdate : () =>{
      if(Math.abs(saturnGroup.position.x - 1.5) < 0.01){
        const saturnContent = otherPlanetTexts.querySelector('.saturn').innerHTML;
        planetText.querySelector(".planet_h1").textContent = "Saturn";
        planetText.querySelector(".planet_p").innerHTML = saturnContent;

        //editing the elements
        periodicElements.querySelector(".number").textContent = "1";
        periodicElements.querySelector(".alpha").textContent = "H";
        periodicElements.querySelector(".alpha-text").textContent = "Hydrogen";

        periodicElements1.querySelector(".number1").textContent = "2";
        periodicElements1.querySelector(".alpha1").textContent = "HE";
        periodicElements1.querySelector(".alpha-text1").textContent = "Helium";
      }
    }
  })


}






// Updating the next button event listener to call the next scene functions in sequence
let currentScene = 0;

nextButton.addEventListener("click", function () {
  if (currentScene < sceneFunctions.length) {
    sceneFunctions[currentScene]().then(() => {
      currentScene++;
    });
  }
});


//the function for rotating the planets this is standard and untouable
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
  //rotation of saturn 
  saturnGroup.rotation.x += 0.0009;
  renderer.render(scene, camera)
}

animate()

