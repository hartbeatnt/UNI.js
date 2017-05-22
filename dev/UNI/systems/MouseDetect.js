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
    this.intersects = [];
    this.prevIntersects = [];
	}
  onMouseMove(e){
    const mouse = new THREE.Vector2(
      (e.offsetX / this.domEl.clientWidth)  *  2 - 1,
      (e.offsetY / this.domEl.clientHeight) * -2 + 1 
    );
    this.raycaster.setFromCamera(mouse, this.universe.camera);
    this.intersects = this.raycaster.intersectObjects(this.universe.scene.children);
    let prev = this.prevIntersects;
    this.intersects.forEach((intersect, i) => {
      let ent = intersect.object.UNI;
      if (!ent) return;
      let comps = ent.components;
      return i === 0
        ? (
            comps.onMouseEnter 
              && ( !prev[0] || prev[0].object !== intersect.object ) 
              && comps.onMouseEnter(),
            comps.onMouseOver 
              && comps.onMouseOver()
          )
        : (
            comps.onHidMouseEnter 
              && !prev.map(()=>{
                return intersect.object
              }).includes(intersect.object) 
              && comps.onHidMouseEnter(),
            comps.onHidMouseOver 
              && comps.onHidMouseOver()
          )
    })
    prev.forEach((intersect, i) => {
      const ent = intersect.object.UNI;
      if (!ent) return;
      let comps = ent.components;
      return i === 0
        ? comps.onMouseExit 
            && ( !this.intersects[0] || this.intersects[0].object !== intersect.object ) 
            && comps.onMouseExit()
        : comps.onHidMouseExit 
            && !this.intersects.map((newIntersect)=>{
              return newIntersect.object
            }).includes(intersect.object) 
            && comps.onHidMouseExit()
    })
    this.prevIntersects = this.intersects
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