const THREE = require('three')
import Keyboard from './Keyboard';
import Scene from './Scene';

const container = document.querySelector('#container')
const sceneSettings = { renderer: {clearColor: "#24f46a"} }

const particles = new Scene(container, sceneSettings);
particles.animate = time => {
  requestAnimationFrame(particles.animate);
  particles.render();
}
particles.animate(performance.now)
