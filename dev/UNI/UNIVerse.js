import deepOverride from './_utils/deepOverride.js'
const THREE = require('three')

const defaultprops = {
  cameraType: 'Perspective',
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

class UNIVerse {
  constructor(domNode,props={}) {
    props = deepOverride(defaultprops, props)
    let w = domNode.offsetWidth;
    let h = domNode.offsetHeight;
    this.entities = [];
    this.renderer = new THREE.WebGLRenderer(props.renderParams);
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(props.clearColor);
    this.camera = new THREE[`${props.cameraType}Camera`](
      props.fov, 
      props.aspect || w/h, 
      props.nearClip, 
      props.farClip
    );
    this.camera.position.x = props.position.x;
    this.camera.position.y = props.position.y;
    this.camera.position.z = props.position.z;
    
    this.scene = new THREE.Scene();
    
    window.addEventListener('resize',()=>{
      props.aspect
        ? this.setSize(domNode, props.aspect)
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
    this.scene.add(entity.mesh);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

}

export default UNIVerse;