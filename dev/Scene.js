const THREE = require('three')

const defaultOptions = {
  camera: {
    fov: 60,
    nearClip: 1,
    farClip: 1000,
    position: {
      x: 0,
      y: 0,
      z: 4
    }
  },
  renderer: {
    clearColor: '#ffffff',
    params: {
      antialias: true,
    },
  }
}

class Scene {
  constructor(domNode,options={}) {
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    let settings = {
      camera: {...defaultOptions.camera, ...options.camera},
      renderer: {...defaultOptions.renderer, ...options.renderer}
    }
    
    this.domNode = domNode;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      settings.camera.fov, 
      settings.camera.aspect || w/h, 
      settings.camera.nearClip, 
      settings.camera.farClip
    );
    this.renderer = new THREE.WebGLRenderer(settings.renderer.params);
    this.camera.position.x = settings.camera.position.x;
    this.camera.position.y = settings.camera.position.y;
    this.camera.position.z = settings.camera.position.z;
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(settings.renderer.clearColor);
    
    window.addEventListener('resize',()=>{
      settings.camera.aspect
        ? this.setSize(this.domNode, settings.camera.aspect)
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

export default Scene;