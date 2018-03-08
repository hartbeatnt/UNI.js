class Keyboard {
  constructor(...args) {
    args.forEach(key => this.addKey(key))

    window.addEventListener('keydown', e => {
      if (e.key in this) this[e.key] = true;
    })
    window.addEventListener('keyup', e =>{ 
      if (e.key in this) this[e.key] = false;  
    })
  }
  addKey(...args) {
    args.forEach(key => {
      if (typeof key === 'string') this[key] = false
    })    
  }
  addKeys() {
    this.addKey.call(this, arguments)
  }
}

export default Keyboard