import './src/style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer
({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 2, 5);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

const lightHelper = new THREE.DirectionalLightHelper(light, 2);
scene.add(lightHelper);


const modelLoader = new GLTFLoader();

modelLoader.load(
    '/car.glb',
    (gltf) => {
        const car = gltf.scene;

        scene.add(car);
        car.scale.set(1, 1, 1);
        car.position.set(0, 0, 0);
    },
    
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '%');
    },
    
    (err) => {
        console.error(err);
    }
);

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();