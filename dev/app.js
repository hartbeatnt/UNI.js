const THREE = require('three');
const CANNON = require('cannon');
import Keyboard from './Keyboard';
import THR33PhysScene from './THR33/THR33PhysScene';
import THR33PhysCube from './THR33/THR33PhysCube';
import THR33Cube from './THR33/THR33Cube';
import THR33PartSys from './THR33/THR33PartSys';;

const container = document.querySelector('#container')
const sceneSettings = { 
  clearColor: "#24f46a",
  gravity: {x:0, y:-1, z:0},
} 

const THR33 = new THR33PhysScene(container, sceneSettings);
const partSys = new THR33PartSys();
const cube = new THR33PhysCube({
  position: {x:0,y:1.5,z:0},
  angularVelocity: {x:1,y:0,z:0},
  mass: 1,
  size: 0.5,
});

THR33.addEntity(partSys)
THR33.addPhysEntity(cube)
const animate = time => {
  requestAnimationFrame(animate);
  const point = new THR33Cube({
    size:0.05, 
    color: 0xad43e1,
    position: cube.el.position.clone()
  });
  THR33.addEntity(point);
  THR33.render(deltaTime);
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)
