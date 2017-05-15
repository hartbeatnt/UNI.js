const THREE = require('three')
import Keyboard from './Keyboard';
import THR33Scene from './THR33/THR33Scene';
import THR33Cube from './THR33/THR33Cube';

const container = document.querySelector('#container')
const sceneSettings = { clearColor: "#24f46a"} 

const THR33 = new THR33Scene(container, sceneSettings);
// const cube = new THR33Cube();

// THR33.scene.add(cube.el);

const particleCount = 1800
const particles = new THREE.Geometry();
const pMaterial = new THREE.PointsMaterial({
  color: 0xFFFFFF
});

for (let p = 0; p < particleCount; p++) {

  const pX = Math.random() * 500 - 250;
  const pY = Math.random() * 500 - 250;
  const pZ = Math.random() * 500 - 250;
  const particle = new THREE.Vector3(pX, pY, pZ);

  particles.vertices.push(particle);
}

const particleSystem = new THREE.Points(
  particles,
  pMaterial
);

THR33.scene.add(particleSystem);


const animate = time => {
  requestAnimationFrame(animate);

  THR33.render();
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)
