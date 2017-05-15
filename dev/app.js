const THREE = require('three')
import Keyboard from './Keyboard';
import Scene from './Scene';

const container = document.querySelector('#container')
const keyboard = new Keyboard();

const scene = new Scene(container);
scene.render()

// const particleScene = {
//   container_W = container.offsetWidth,
//   container_H = container.offsetHeight,

//   scene, camera, renderer,
// }
