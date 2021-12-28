import * as THREE from 'https://unpkg.com/three@0.136.0/build/three.module.js';

/*Import OrbitControls class from CDN namespace*/
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

/* import * as OrbitControls from 'https://unpkg.com/three@0.136.0/examples/js/controls/OrbitControls.js';
from build*/

/*Initialize Scene, Camera (with size variable) and Renderer*/
const sizes = {width: window.innerWidth, height: window.innerHeight}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 90, sizes.width/sizes.height, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

/*Compatibility with viewport and setting camera position*/
renderer.setPixelRatio ( window.devicePixelRatio );
renderer.setSize ( window.innerWidth, window.innerHeight );
camera.position.setZ (30);

/*Render scene*/
renderer.render ( scene, camera );

/*Initialize geometry*/
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0x572dff/*, wireframe: true*/} ); /*Use wireframe for BasicMaterial*/
const torus = new THREE.Mesh( geometry, material );

/*Add geometry to scene*/
scene.add(torus)

/*Instantiate light and set position*/
const pointLight = new THREE.PointLight(0xfffff2)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(30,10,-5)

/*Add light to scene*/
scene.add (pointLight, ambientLight)

/*Initialize & add to scene - pointLight & grid Helper*/
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper)

/*Instantiate OrbitControl class*/
const controls = new OrbitControls(camera, renderer.domElement);

/*Pass this along with the renderer argument to render scene*/
function animate (){
  /*Pass animation function based on animation properties*/
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  /*OrbitControl function animate*/
  controls.update();

  renderer.render( scene, camera);
}

/*Begin above animate function*/
animate()