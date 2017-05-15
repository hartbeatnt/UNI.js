const THREE = require('three')

const defaultOptions = {
  size: 1,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale:    { x: 1, y: 1, z: 1 },
  material: new THREE.MeshBasicMaterial({color: 0xD3D3D3})
}

class THR33Cube {
  constructor(options) {
    options = {...defaultOptions, ...options};
    console.log(options)
    let geometry = new THREE.BoxBufferGeometry(
      options.size, options.size, options.size
    );
    let mesh = new THREE.Mesh(geometry, options.material);
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
    this.el = mesh;
  }
}

export default THR33Cube