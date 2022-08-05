import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import left from "./Skybox/left.png";
import right from "./Skybox/right.png";
import up from "./Skybox/up.png";
import down from "./Skybox/down.png";
import front from "./Skybox/front.png";
import back from "./Skybox/back.png";

const canvas = document.getElementById("canvas");
// scene
const scene = new THREE.Scene();

// size
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 3000);
camera.position.set(0, 500, 1000);
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

// envimage

const urls = [
  left,
  right, 
  up,
  down,
  front,
  back
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(500);

// cubeCamera
const cubeCamera =  new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

// object
const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
  reflectivity: 1,
});
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);

function animate() {
  controls.update();
  cubeCamera.update( renderer, scene );
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
