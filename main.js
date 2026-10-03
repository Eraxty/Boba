import './src/style.css';
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
controls.enablePan = false;
controls.enableZoom = false;

controls.minPolarAngle = controls.getPolarAngle();
controls.maxPolarAngle = controls.getPolarAngle();

const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const grid = new THREE.GridHelper(20, 20);
scene.add(grid);



const modelLoader = new GLTFLoader();

modelLoader.load(
    `${import.meta.env.BASE_URL}car.glb`,
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

function star(){
    const size = Math.random() * 0.08 + 0.02;

    const geometry = new THREE.SphereGeometry(size, 8, 8)
    
        const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: Math.random() * 4 + 2
        })
    
    const mesh = new THREE.Mesh(geometry, material);
    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 20;

    mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 100,
        Math.sin(angle) * radius
    );


    scene.add(mesh);
};

for (let i = 0; i < 500; i++) {
    star();
}

animate();
