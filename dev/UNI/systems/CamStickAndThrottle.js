const THREE = require('three')

class CamStickAndThrottle {
  constructor(camera) {
    console.log(camera)
    console.log(navigator.getGamepads())
    window.addEventListener("gamepadconnected", e => this.handleGamePad(e))
  }

  tick(time) {
    
  }
}

export default CamStickAndThrottle