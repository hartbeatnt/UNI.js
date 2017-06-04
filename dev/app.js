const THREE = require('three');
const CANNON = require('cannon');
import Keyboard from './UNI/systems/Keyboard';

import UNIVerse from './UNI/UNIVerse';
import UNIPhysVerse from './UNI/UNIPhysVerse';
import UNIPhysCube from './UNI/UNIPhysCube';
import UNICube from './UNI/UNICube';
import UNIPartSys from './UNI/UNIPartSys';
import UNILight from './UNI/UNILight';

const container = document.querySelector('#container')
const sceneSettings = { 
  clearColor: "#24f46a",
} 

const universe = new UNIVerse(container, sceneSettings);

const partSys = new UNIPartSys();
const cube1 = new UNICube({
  position:{x:-1},
  material: new THREE.MeshLambertMaterial({ color:0x2194ce }),
});
const cube2 = new UNICube({
  position:{x:1},
  mass: 1,
  material: new THREE.MeshLambertMaterial({ color:0x2194ce }),
});

const ambLight = new UNILight()

const ptLight = new UNILight({
  type:'Point',
  position: { x: 0, y: 0, z: 1 },
})



//  TODO: allow addEntity to add multiple entities in a row
universe.addEntity(partSys);
universe.addEntity(ambLight);
universe.addEntity(ptLight);
universe.addEntity(cube1);
universe.addEntity(cube2);


const keyboard = new Keyboard('ArrowUp','ArrowDown')
const animate = time => {
    requestAnimationFrame(animate);
    keyboard.ArrowUp && moveLightZ(ptLight, -1);
    keyboard.ArrowDown && moveLightZ(ptLight, 1);
    universe.render(deltaTime);
}

const moveLightZ = (light,amt) => {
  light.mesh.position.z+=.01*amt
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)