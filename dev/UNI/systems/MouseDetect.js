const THREE = require('three')

class MouseDetect {
	constructor(universe) {
    this.universe = universe;
    this.clicked = false;
    this.raycaster = new THREE.Raycaster();
    this.domEl = this.universe.renderer.domElement;
    this.domEl.addEventListener('mousemove', e => this.onMouseMove(e));
    this.domEl.addEventListener('mousedown', e => this.onMouseDown(e));
    this.domEl.addEventListener('mouseup', e => this.onMouseUp(e));
    this.domEl.addEventListener('click', e => this.onClick(e));
    this.domEl.addEventListener('dblclick', e => this.onDblClick(e));
    this.domEl.addEventListener('scroll', e => this.onScroll(e));
    this.domEl.addEventListener('wheel', e => this.onWheel(e));
	}
  onMouseMove(e){
    const mouse = new THREE.Vector2(
      (e.offsetX / this.domEl.clientWidth)  *  2 - 1,
      (e.offsetY / this.domEl.clientHeight) * -2 + 1 
    );
    this.raycaster.setFromCamera(mouse, this.universe.camera);
    this.raycaster.intersectObjects(this.universe.scene.children).forEach((intersect,i)=>{
      const entity = intersect.object.UNI;
      return entity
        ? i === 0
          ? entity.components.onMouseOver && entity.components.onMouseOver()
          : entity.components.onCoveredMouseOver && entity.components.onCoveredMouseOver()
        : null
    })
  }
  onMouseDown(e){

  }
  onMouseUp(e){

  }
  onClick(e){
    console.log('click')
  }
  onDblClick(e){

  }
  onScroll(e){

  }
  onWheel(e){

  }
}

export default MouseDetect