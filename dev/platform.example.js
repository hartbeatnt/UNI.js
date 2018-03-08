import Keyboard from './UNI/systems/Keyboard';

import UNIVerse from './UNI/UNIVerse';
import UNIPhysVerse from './UNI/UNIPhysVerse';
import UNIPhysCube from './UNI/UNIPhysCube';
import UNIPartSys from './UNI/UNIPartSys';
import UNILight from './UNI/UNILight';
import UNILoop from './UNI/UNILoop';

export default () => {

  const THREE = require('three');
  const CANNON = require('cannon');

  const container = document.querySelector('#container')
  const sceneSettings = { 
    clearColor: "#24f46a",
  } 

  const universe = new UNIPhysVerse(container, sceneSettings);

  const partSys = new UNIPartSys();
  const cube1 = new UNIPhysCube({
    position:{x:-1},
    size: 1,
    angularVelocity:  { x: 0, y: 0, z: 1 },
    material: new THREE.MeshLambertMaterial({ color:0x2194ce }),
  });
  const cube2 = new UNIPhysCube({
    position:{x:1},
    angularVelocity:  { x: 0, y: 0, z: 1 },
    material: new THREE.MeshBasicMaterial({ color:0x2194ce }),
  });

  const floor = new UNIPhysCube({
    position: { y: -1, z: -2.5 },
    size: 5,
    scale: { x: 1, y: .01, z: 1 },
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
  const animate = deltaTime => {
      keyboard.ArrowUp && moveLightZ(ptLight, -1);
      keyboard.ArrowDown && moveLightZ(ptLight, 1);
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