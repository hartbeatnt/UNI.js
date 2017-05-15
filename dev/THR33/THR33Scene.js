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
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    options = {...defaultOptions, ...options}
    this.domNode = domNode;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      options.fov, 
      options.aspect || w/h, 
      options.nearClip, 
      options.farClip
    );
    this.renderer = new THREE.WebGLRenderer(options.renderParams);
    this.camera.position.x = options.position.x;
    this.camera.position.y = options.position.y;
    this.camera.position.z = options.position.z;
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(options.clearColor);
    
    window.addEventListener('resize',()=>{
      options.aspect
        ? this.setSize(this.domNode, options.aspect)
        : this.setSize(this.domNode);
    })
    this.domNode.appendChild(this.renderer.domElement);
  }

  setSize(domNode, aspect=false) {
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    this.camera.aspect = aspect || w / h;
    this.camera.updateProjectionMatrix();
	  this.renderer.setSize(w, h);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}

export default THR33Scene;