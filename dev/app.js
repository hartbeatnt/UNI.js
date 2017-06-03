const THREE = require('three');
const CANNON = require('cannon');
import Keyboard from './UNI/systems/Keyboard';

import UNIVerse from './UNI/UNIVerse';
import UNIPhysVerse from './UNI/UNIPhysVerse';
import UNIPhysCube from './UNI/UNIPhysCube';
import UNICube from './UNI/UNICube';
import UNIPartSys from './UNI/UNIPartSys';;

const container = document.querySelector('#container')
const sceneSettings = { 
  clearColor: "#24f46a",
  gravity: {x:0, y:-1, z:0},
} 

const universe = new UNIPhysVerse(container, sceneSettings);

const partSys = new UNIPartSys();
const cube = new UNICube({position:{x:-1}});
const physCube = new UNIPhysCube({position:{x:1}});



//  TODO: allow addEntity to add multiple entities in a row
universe.addEntity(partSys);
universe.addEntity(cube);
universe.addPhysEntity(physCube);

const animate = time => {
  if (time < 3000){
    requestAnimationFrame(animate);

    universe.render(deltaTime);
  }
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)
>>>>>>> rambda
