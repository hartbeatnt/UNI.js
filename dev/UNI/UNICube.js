const THREE = require('three')

const defaultOptions = {
  components: {},
  size: 1,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale:    { x: 1, y: 1, z: 1 },
  color: 0xD3D3D3,
  material: null,
}

class UNICube {
  constructor(options={}) {
    options = {...defaultOptions, ...options};
    let geometry = new THREE.BoxBufferGeometry(
      options.size, options.size, options.size
    );
    let material = options.material
      || new THREE.MeshBasicMaterial({color: options.color});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      options.position.x,
      options.position.y,
      options.position.z
    );
    mesh.rotation.set(
      options.rotation.x,
      options.rotation.y,
      options.rotation.z
    );
    mesh.scale.set(
      options.scale.x,
      options.scale.y,
      options.scale.z
    );
    this.mesh = mesh;
    this.mesh.UNI = this;
    this.components = options.components;
  }
}

export default UNICube