import Keyboard from './systems/Keyboard';

import UNIVerse from './UNIVerse';
import UNIPhysVerse from './UNIPhysVerse';
import UNIPhysCube from './UNIPhysCube';
import UNICube from './UNICube';
import UNIPartSys from './UNIPartSys';
import UNILight from './UNILight';
import UNILoop from './UNILoop';

export default () => {

  const THREE = require('three');
  const CANNON = require('cannon');

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
    material: new THREE.MeshBasicMaterial({ color:0x2194ce }),
  });

  const floor = new UNICube({
    position: { y: -4, z: -2.5 },
    size: 5,
    material: new THREE.MeshLambertMaterial({ color:0x2194ce }),
  })

  const ambLight = new UNILight()

  const ptLight = new UNILight({
    type:'Point',
    position: { x: 0, y: 0, z: -0.25 },
    intensity: 2,
  })



  //  TODO: allow addEntity to add multiple entities in a row
  universe.addEntity(partSys);
  universe.addEntity(ambLight);
  universe.addEntity(ptLight);
  universe.addEntity(cube1);
  universe.addEntity(cube2);
  universe.addEntity(floor);


  const keyboard = new Keyboard('ArrowUp','ArrowDown')
  const animate = (time, deltaTime, avgFps) => {
    keyboard.ArrowUp && moveLightZ(ptLight, 1);
    keyboard.ArrowDown && moveLightZ(ptLight, -1);
  }
  
  const moveLightZ = (light,amt) => {
    light.mesh.position.z+=.01*amt
  }

  const draw = deltaTime => {
    universe.render(deltaTime);
  }

  const loop = UNILoop();
  loop.add.update(animate);
  loop.add.output(draw);
  loop.run();

}