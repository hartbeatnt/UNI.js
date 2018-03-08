import deepOverride from './_utils/deepOverride.js'

const defaultProps = {
  components: [],
  systems: [],
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
    this.components.forEach(component => {
      component.tick && component.tick();
    });
    this.systems.forEach(system => {
      system.tick && system.tick();
    });
    this.children.forEach(child => {
      child.tick && child.tick();
    });
  }
}

export default UNIEntity