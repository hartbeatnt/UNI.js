const THREE = require('three');
const CANNON = require('cannon');
import Keyboard from './Keyboard';
import THR33PhysScene from './THR33/THR33PhysScene';
import THR33PhysCube from './THR33/THR33PhysCube'
import THR33PartSys from './THR33/THR33PartSys';;

const container = document.querySelector('#container')
const sceneSettings = { 
  clearColor: "#24f46a",
} 

const THR33 = new THR33PhysScene(container, sceneSettings);
const partSys = new THR33PartSys();
const cube = new THR33PhysCube({
  position: {x:0,y:1.5,z:0},
  mass: 1,
  size: 0.5,
  // velocity: new CANNON.Vec3(0.0, -1.0, 0.0),
});

THR33.addEntity(partSys)
THR33.addPhysEntity(cube)
const animate = time => {
  requestAnimationFrame(animate);
  
  THR33.render(deltaTime);
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)
