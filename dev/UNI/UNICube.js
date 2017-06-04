import deepOverride from './_utils/deepOverride.js'
import UNIEntity from './UNIEntity'
const THREE = require('three')

const defaultProps = {
  size: 1,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale:    { x: 1, y: 1, z: 1 },
  castShadow: true,
  receiveShadow: true,
  color: 0xD3D3D3,
  material: null,
}

class UNICube extends UNIEntity {
  constructor(props={}) {
    super(props)
    props = deepOverride(defaultProps, props);
    const geometry = new THREE.BoxBufferGeometry(
      props.size, props.size, props.size
    );
    const material = props.material
      || new THREE.MeshBasicMaterial({color: props.color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = props.castShadow;
    mesh.receiveShadow = props.receiveShadow;
    mesh.position.set(
      props.position.x,
      props.position.y,
      props.position.z
    );
    mesh.rotation.set(
      props.rotation.x,
      props.rotation.y,
      props.rotation.z
    );
    mesh.scale.set(
      props.scale.x,
      props.scale.y,
      props.scale.z
    );
    this.obj3d = mesh;
    this.obj3d.UNI = this;
  }
}

export default UNICube