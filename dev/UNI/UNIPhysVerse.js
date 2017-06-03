import deepOverride from './utils/deepOverride.js'
const CANNON = require('cannon')
import UNIVerse from './UNIVerse'

const defaultOptions = {
  physEntities: [],
  gravity: { x: 0, y: -9.8, z: 0 },
  broadphase: new CANNON.NaiveBroadphase(),
  solverIterations: 10,
  interpolation: false,
  timeStep: 1/60,
}

class UNIPhysVerse extends UNIVerse {
  constructor(domNode,options={}) {
    super(domNode, options);
    options = deepOverride(defaultOptions, options)
    this.physEntities = options.physEntities
    this.world = new CANNON.World();
    this.world.gravity = new CANNON.Vec3(
      options.gravity.x,
      options.gravity.y,
      options.gravity.z,
    );
    this.world.broadphase = options.broadphase;
    this.world.solver.iterations = options.solverIterations;
    this.interpolation = options.interpolation;
    this.timeStep = options.timeStep;
  }
  addPhysEntity(entity) {
    this.physEntities.push(entity);
    this.scene.add(entity.mesh);
    this.world.addBody(entity.body);
  }
  updatePhysics() {
    this.world.step(this.timeStep);
  }

  render() {
    this.updatePhysics();
    this.physEntities.forEach(entity=>{
      entity.tick();
    })
    this.renderer.render(this.scene, this.camera);
  }

}

export default UNIPhysVerse; 