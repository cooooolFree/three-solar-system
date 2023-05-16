import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import starsTexture from "/img/stars.jpg";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.TextureLoader();
scene.background = cubeTextureLoader.load(starsTexture);

const TextureLoader = new THREE.TextureLoader();
const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMap = new THREE.MeshBasicMaterial({
  map: TextureLoader.load("/img/sun.jpg"),
});

const createFlanete = (size, texture, positionX, ring) => {
  const geometry = new THREE.SphereGeometry(size, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: TextureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geometry, material);
  const obj = new THREE.Object3D();

  mesh.position.x = positionX;

  if (ring) {
    const ringGeometry = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: TextureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.x = positionX;
    ringMesh.rotation.x = -0.5 * Math.PI;
    obj.add(ringMesh);
  }

  obj.add(mesh);
  scene.add(obj);
  return { mesh, obj };
};

const sun = new THREE.Mesh(sunGeometry, sunMap);
scene.add(sun);

const mercury = createFlanete(3.2, "/img/mercury.jpg", 28);
const venus = createFlanete(5.8, "/img/venus.jpg", 44);
const earth = createFlanete(6, "/img/earth.jpg", 62);
const mars = createFlanete(4, "/img/mars.jpg", 78);
const jupiter = createFlanete(12, "/img/jupiter.jpg", 100);
const saturn = createFlanete(10, "/img/saturn.jpg", 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: "/img/saturn ring.png",
});
const uranus = createFlanete(7, "/img/uranus.jpg", 176, {
  innerRadius: 10,
  outerRadius: 20,
  texture: "/img/uranus ring.png",
});
const neptune = createFlanete(7, "/img/neptune.jpg", 216);
const pluto = createFlanete(2.8, "/img/pluto.jpg", 280);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

const animate = () => {
  //자전
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.0008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
