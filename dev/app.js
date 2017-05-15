const THREE = require('three')
import Keyboard from './Keyboard';
import THR33Scene from './THR33/THR33Scene';
import THR33PartSys from './THR33/THR33PartSys';

const container = document.querySelector('#container')
const sceneSettings = { clearColor: "#24f46a"} 

const THR33 = new THR33Scene(container, sceneSettings);
const partSys = new THR33PartSys();

THR33.scene.add(partSys.el)

const animate = time => {
  requestAnimationFrame(animate);

  THR33.render();
}

let oldTime = performance.now();
let deltaTime = performance.now();
animate(oldTime)
