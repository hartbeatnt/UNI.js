import deepOverride from './_utils/deepOverride.js'
import UNIEntity from './UNIEntity'
const THREE = require('three')

const LIGHT_TYPES = {
  ambient: "Ambient",
  directional: "Directional",
  point: "Point",
  spot: "Spot",
  hemisphere: "Hemisphere",
  rectarea: "RectArea",
}

const defaultProps = {
  position: {x:0, y: 5, z: 5},
  type: "Ambient",
  color: 0xFFFFFF,
  groundColor: 0xFFFFFF,
  // castShadow: true,
  skyColor: null,
  intensity: 1,
  distance: 0,
  decay: 2,
  angle: Math.PI / 4,
  penumbra: 0,
  width: 10,
  height: 10,
}

class UNILight extends UNIEntity {
  constructor(props={}) {
    super(props)
    console.log(props)
    if (!isNaN(props)) props = {color:props}
    console.log(props)
    props = deepOverride(defaultProps, props);
    console.log(props)
    let lightType = LIGHT_TYPES[props.type.toLowerCase()];
    const light = new THREE[`${lightType}Light`]();
    if (lightType === "Point" || lightType === "Spot") {
      if (lightType === "Spot") {
        light.angle = props.angle;
        light.penumbra = props.penumbra;
      }
      light.distance = props.distance;
      light.decay = props.decay;
    }
    if (lightType === "RectArea") {
      light.width = props.width;
      light.height = props.height;
    }
    if (lightType === "Hemisphere") {
      light.groundColor = props.groundColor;
    }
    light.color = new THREE.Color(props.skyColor || props.color);
    light.intensity = props.intensity;
    // light.castShadow = props.castShadow;
    let { x, y, z } = props.position;
    light.position.set(x, y, z);
    this.mesh = light;
  }
}

export default UNILight;