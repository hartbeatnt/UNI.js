import deepOverride from './_utils/deepOverride.js'

const THREE = require('three')

const defaultProps = {
  particleCount: 1500,
  geometry: new THREE.Geometry(),
  material: new THREE.PointsMaterial(),
  xMaxOffset: 100,
  yMaxOffset: 100,
  zMaxOffset: 100,
}

class UNIPartSys {
  constructor(props={}) {
    props = deepOverride(defaultProps, props);
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
    this.obj3d = new THREE.Points(
      particles,
      props.material
    )
  }
}

export default UNIPartSys