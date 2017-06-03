import deepOverride from './utils/deepOverride.js'

const THREE = require('three')

const defaultOptions = {
  particleCount: 1500,
  geometry: new THREE.Geometry(),
  material: new THREE.PointsMaterial(),
  xMaxOffset: 100,
  yMaxOffset: 100,
  zMaxOffset: 100,
}

class UNIPartSys {
  constructor(options={}) {
    options = deepOverride(defaultOptions, options);
    console.log
    const particles = options.geometry;
    const randOffset = max => {
      return Math.random() * 2 * max - max
    }
    for (let i = 0; i < options.particleCount; i++) {
      particles.vertices.push(new THREE.Vector3(
        randOffset(options.xMaxOffset),
        randOffset(options.yMaxOffset),
        randOffset(options.zMaxOffset),
      ))
    }
    this.mesh = new THREE.Points(
      particles,
      options.material
    )
  }
}

export default UNIPartSys