class Keyboard {
  constructor() {
    Array.from(arguments).forEach(key=>{
      this[key] = false;
    })
    window.addEventListener('keydown', (e)=>{
      if (e.key in this) this[e.key] = true;
    })
    window.addEventListener('keyup', (e)=>{
      if (e.key in this) this[e.key] = false;  
    })
  }
  addKeys() {
    Array.from(arguments).forEach(key=>{
      console.log(key)
      this[key] = false;
    })    
  }
  addKey() {
    this.addKeys.apply(this, arguments)
  }
}

export default Keyboard