const THREE = require('three')

class Scene {
  constructor(domNode,options={}) {
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    this.domNode = domNode;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      (options.camera && options.camera.fov) || 60, 
      (options.camera && options.camera.aspect) || w/h, 
      (options.camera && options.camera.nearClip) || 1, 
      (options.camera && options.camera.farClip) || 1000
    );
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.camera.position.x = (options.camera && options.camera.x) || 4;
    this.camera.position.y = (options.camera && options.camera.y) || 4;
    this.camera.position.z = (options.camera && options.camera.z) || 4;
    this.renderer.setSize(w, h)
    options.renderer && options.renderer.clearColor
      ? this.renderer.setClearColor(options.renderer.clearColor)
      : this.renderer.setClearColor("#24f46a")
    
    window.addEventListener('resize',()=>{
      options.camera && options.camera.aspect
        ? this.setSize(this.domNode, options.camera.aspect)
        : this.setSize(this.domNode)
    })
    this.domNode.appendChild(this.renderer.domElement)
  }
  setSize(domNode, aspect=false) {
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    this.camera.aspect = aspect || domNode.offsetWidth / domNode.offsetHeight;
    this.camera.updateProjectionMatrix();
    
	  this.renderer.setSize(domNode.offsetWidth, domNode.offsetHeight);
  }
  animate() {
    requestAnimationFrame(animate)
    this.render()
  }
  render() {
    this.renderer.render(this.scene, this.camera)
  }

}

export default Scene;