const THREE = require('three')
import Keyboard from './Keyboard';
import THR33Scene from './THR33/THR33Scene';
import THR33Cube from './THR33/THR33Cube';

const container = document.querySelector('#container')
const sceneSettings = { clearColor: "#24f46a"} 

const THR33 = new THR33Scene(container, sceneSettings);
const cube = new THR33Cube()
console.log(cube)

THR33.scene.add(cube.el)

const animate = time => {
  requestAnimationFrame(animate);
  THR33.render();
}

animate(performance.now)
