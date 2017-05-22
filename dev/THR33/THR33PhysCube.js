const CANNON = require('cannon');
import THR33Cube from './THR33Cube';

const defaultOptions = {
    mass: 1,
    angularDamping: 0,
    velocity: { x: 0, y: 0, z: 0 },
    angularVelocity:  { x: 0, y: 0, z: 0 },
};

class THR33PhysCube extends THR33Cube {
  constructor(options={}) {
    super(options);
    options = {...defaultOptions, ...options};
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
      this.el.position.copy(this.body.position);
      this.el.quaternion.copy(this.body.quaternion);
  }
}

export default THR33PhysCube