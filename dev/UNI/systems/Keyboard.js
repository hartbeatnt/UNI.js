class Keyboard {
  constructor() {
    [...arguments].forEach(key => this.addKey(key))

    window.addEventListener('keydown', e => {
      if (e.key in this) this[e.key] = true;
    })
    window.addEventListener('keyup', e =>{ 
      if (e.key in this) this[e.key] = false;  
    })
  }
  addKey() {
    [...arguments].forEach(key => {
      if (typeof key === 'string') this[key] = false
    })    
  }
  addKeys() {
    this.addKey.apply(this, arguments)
  }
}

export default Keyboard