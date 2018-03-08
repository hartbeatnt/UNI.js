import deepOverride from './_utils/deepOverride.js'
const CANNON = require('cannon')
import UNIVerse from './UNIVerse'

const defaultProps = {
  physEntities: [],
  gravity: { x: 0, y:-9.8, z: 0 },
  broadphase: new CANNON.NaiveBroadphase(),
  solverIterations: 10,
  interpolation: false,
  timeStep: 1/60,
}

class UNIPhysVerse extends UNIVerse {
  constructor(domNode,props={}) {
    super(domNode, props);
    props = deepOverride(defaultProps, props)
    this.physEntities = props.physEntities
    this.world = new CANNON.World();
    this.world.gravity = new CANNON.Vec3(
      props.gravity.x,
      props.gravity.y,
      props.gravity.z,
    );
    this.world.broadphase = props.broadphase;
    this.world.solver.iterations = props.solverIterations;
    this.interpolation = props.interpolation;
    this.timeStep = props.timeStep;
  }
  addPhysEntity(entity) {
    this.addEntity(entity);
    this.physEntities.push(entity);
    this.scene.add(entity.mesh);
    this.world.addBody(entity.body);
  }
  updatePhysics(time, deltaTime) {
    this.world.step(deltaTime / 1000);
  }

  render(time, deltaTime) {
    this.physEntities.forEach(entity=>{
      entity.tick(time, deltaTime);
    })
    this.updatePhysics(time, deltaTime);
    this.renderer.render(this.scene, this.camera);
  }

}

export default UNIPhysVerse; 