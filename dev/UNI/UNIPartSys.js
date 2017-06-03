import deepOverride from './utils/deepOverride.js'

const THREE = require('three')

const defaultprops = {
  particleCount: 1500,
  geometry: new THREE.Geometry(),
  material: new THREE.PointsMaterial(),
  xMaxOffset: 100,
  yMaxOffset: 100,
  zMaxOffset: 100,
}

class UNIPartSys {
  constructor(props={}) {
    props = deepOverride(defaultprops, props);
    console.log
    const particles = props.geometry;
    const randOffset = max => {
      return Math.random() * 2 * max - max
    }
    for (let i = 0; i < props.particleCount; i++) {
      particles.vertices.push(new THREE.Vector3(
        randOffset(props.xMaxOffset),
        randOffset(props.yMaxOffset),
        randOffset(props.zMaxOffset),
      ))
    }
    this.mesh = new THREE.Points(
      particles,
      props.material
    )
  }
}

export default UNIPartSys