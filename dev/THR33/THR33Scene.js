const THREE = require('three')

const defaultOptions = {
  fov: 60,
  nearClip: 1,
  farClip: 1000,
  position: {
    x: 0,
    y: 0,
    z: 4
  },
  clearColor: '#ffffff',
  renderParams: {
    antialias: true,
  }
}

class THR33Scene {
  constructor(domNode,options={}) {
    options = {...defaultOptions, ...options}
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    this.entities = [];
    this.renderer = new THREE.WebGLRenderer(options.renderParams);
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(options.clearColor);
    this.camera = new THREE.PerspectiveCamera(
      options.fov, 
      options.aspect || w/h, 
      options.nearClip, 
      options.farClip
    );
    this.camera.position.x = options.position.x;
    this.camera.position.y = options.position.y;
    this.camera.position.z = options.position.z;
    
    this.scene = new THREE.Scene();
    
    window.addEventListener('resize',()=>{
      options.aspect
        ? this.setSize(domNode, options.aspect)
        : this.setSize(domNode);
    })
    domNode.appendChild(this.renderer.domElement);
  }

  setSize(domNode, aspect=false) {
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    this.camera.aspect = aspect || w / h;
    this.camera.updateProjectionMatrix();
	  this.renderer.setSize(w, h);
  }

  addEntity(entity) {
    this.scene.add(entity.el);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}

export default THR33Scene;