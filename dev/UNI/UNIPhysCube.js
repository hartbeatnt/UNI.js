import deepOverride from './utils/deepOverride.js'

const CANNON = require('cannon');
import UNICube from './UNICube';

const defaultOptions = {
    mass: 1,
    angularDamping: 0,
    velocity: { x: 0, y: 0, z: 0 },
    angularVelocity:  { x: 0, y: 0, z: 0 },
};

class UNIPhysCube extends UNICube {
  constructor(options={}) {
    super(options);
    options = deepOverride(defaultOptions, options);
    const boxVector = new CANNON.Vec3(
        options.size,
        options.size,
        options.size
    );
    const shape = new CANNON.Box(boxVector);
    this.body = new CANNON.Body({
        mass: options.mass,
    });
    this.body.addShape(shape);
    this.body.position = new CANNON.Vec3(
      options.position.x,
      options.position.y,
      options.position.z        
    );
    this.body.velocity = new CANNON.Vec3(
        options.velocity.x,
        options.velocity.y,
        options.velocity.z,
    );
    this.body.velocity = new CANNON.Vec3(
        options.angularVelocity.x,
        options.angularVelocity.y,
        options.angularVelocity.z,
    );
    this.body.angularDamping = options.angularDamping;
  }

  tick() {
      this.mesh.position.copy(this.body.position);
      this.mesh.quaternion.copy(this.body.quaternion);
  }
}

export default UNIPhysCube