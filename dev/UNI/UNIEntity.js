import deepOverride from './_utils/deepOverride.js'
const THREE = require('three')

const defaultProps = {
  components: {},
  systems: {},
  children: [],
}

class UNIEntity {
  constructor(props={}) {
    props = deepOverride(defaultProps, props)
    this.components = props.components;
    this.systems = props.systems;
    this.children = props.children;
  }

  addChild(entity) {
    this.children.push(entity);
  }

  tick () {
    for (let component in components) {
      component.tick();
    }
    for (let system in systems) {
      system.tick();
    }
    for (let child in children) {
      child.tick();
    }
  }
}

export default UNIEntity