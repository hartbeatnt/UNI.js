import deepOverride from './_utils/deepOverride.js'

const CANNON = require('cannon');
import UNICube from './UNICube';

const defaultProps = {
    mass: 1,
    angularDamping: 0,
    velocity: { x: 0, y: 0, z: 0 },
    angularVelocity:  { x: 0, y: 0, z: 0 },
};

class UNIPhysCube extends UNICube {
  constructor(props={}) {
    super(props);
    props = deepOverride(defaultProps, props);
    const boxVector = new CANNON.Vec3(
        props.size,
        props.size,
        props.size
    );
    const shape = new CANNON.Box(boxVector);
    this.body = new CANNON.Body({
        mass: props.mass,
    });
    this.body.addShape(shape);
    this.body.position = new CANNON.Vec3(
      props.position.x,
      props.position.y,
      props.position.z        
    );
    this.body.velocity = new CANNON.Vec3(
        props.velocity.x,
        props.velocity.y,
        props.velocity.z,
    );
    this.body.velocity = new CANNON.Vec3(
        props.angularVelocity.x,
        props.angularVelocity.y,
        props.angularVelocity.z,
    );
    this.body.angularDamping = props.angularDamping;
  }

  tick() {
      this.obj3d.position.copy(this.body.position);
      this.obj3d.quaternion.copy(this.body.quaternion);
  }
}

export default UNIPhysCube