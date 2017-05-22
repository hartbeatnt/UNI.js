const THREE = require('three');
const CANNON = require('cannon');
import Keyboard from './UNI/systems/Keyboard';
import MouseDetect from './UNI/systems/MouseDetect';
import UNIPhysVerse from './UNI/UNIPhysVerse';
import UNIPhysCube from './UNI/UNIPhysCube';
import UNICube from './UNI/UNICube';
import UNIPartSys from './UNI/UNIPartSys';;

const container = document.querySelector('#container')
const sceneSettings = { 
  clearColor: "#24f46a",
  gravity: {x:0, y:0, z:0},
} 

const universe = new UNIPhysVerse(container, sceneSettings);
const mouseDetect = new MouseDetect(universe);

const partSys = new UNIPartSys();
const cube = new UNIPhysCube({
  components: {
    onMouseOver: ()=> console.log('mouse over cube')
  },
  position: {x:0,y:1.5,z:-1},
  mass: 1,
  size: 0.5,
});


universe.addEntity(partSys)
universe.addPhysEntity(cube)
const animate = time => {
  if (time < 3000){
    requestAnimationFrame(animate);
    // const point = new UNICube({
    //   size:0.05, 
    //   color: 0xad43e1,
    //   position: cube.mesh.position.clone()
    // });
    // universe.addEntity(point);
    universe.render(deltaTime);
  }
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)
