const THREE = require('three')
import Keyboard from './Keyboard';
import Scene from './Scene';

const container = document.querySelector('#container')
const keyboard = new Keyboard();
const sceneSettings = { renderer: {clearColor: "#24f46a"} }

const scene = new Scene(container, sceneSettings);
scene.render()

