const CANNON = require('cannon')
import THR33Scene from './THR33Scene'

const defaultOptions = {
  physEntities: [],
  gravity: { x: 0, y: -9.8, z: 0 },
  broadphase: new CANNON.NaiveBroadphase(),
  solverIterations: 10,
  interpolation: false,
  timeStep: 1/60,
}

class THR33PhysScene extends THR33Scene {
  constructor(domNode,options={}) {
    super(domNode, options);
    options = {...defaultOptions, ...options}
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
    this.scene.add(entity.el);
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

export default THR33PhysScene; 