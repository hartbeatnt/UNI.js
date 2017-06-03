const defaultOptions = {
  components: {},
  systems: {},
  children: [],
}

class UNIEntity {
  constructor(options) {
    options = {...defaultOptions, ...options}
    this.components = options.components;
    this.systems = options.systems;
    this.children = options.children;
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