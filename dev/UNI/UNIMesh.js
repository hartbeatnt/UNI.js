import deepOverride from './_utils/deepOverride.js'
import UNIEntity from './UNIEntity'
const THREE = require('three')

const GEOMETRIES = {
  box: "Box",
  circle: "Circle",
  cone: "Cone",
  cylinder: "Cylinder",
  dodecahedron: "Dodecahedron",
  edges: "Edges", //
  extrude: "Extrude",
  icosahedron: "Icosahedron",
  lathe: "Lathe",
  octahedron: "Octahedron",
  parametric: "Parametric",
  plane: "Plane",
  polyhedron: "Polyhedron",
  ring: "Ring",
  shape: "Shape",
  sphere: "Sphere",
  tetrahedron: "Tetrahedron",
  text: "Text", //
  torus: "Torus",
  torusknot: "TorusKnot",
  tube: "Tube",
  wireframe: "Wireframe" //
}

const defaultProps = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale:    { x: 1, y: 1, z: 1 },
  primitive: GEOMETRIES.box,
  geometry: null,
  buffer: true,
  size: 1,
  width: null,
  height: null,
  depth: null,
  radius: null,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
  radialSegments: 8,
  thetaStart: 0,
  thetaLength: 2 * Math.PI,
  openEnded: false,
  detail: 0,
  threshholdAngle: 1,
  color: 0x808080,
  material: null,
  castShadow: true,
  receiveShadow: true,

}

class UNIMesh extends UNIEntity {
  constructor(props={}) {
    // TODO: allow for full geometries to be passed in
    super(props);
    if (typeof props === 'number') props = {size:props};
    if (typeof props === 'string') props = {primitive:props};    
    props = deepOverride(defaultProps, props);
    const geometry = props.geometry || this._parseGeometry(props);
    const material = props.material 
      || new THREE.MeshBasicMaterial({color:props.color});

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = props.castShadow;
    mesh.receiveShadow = props.receiveShadow;
    mesh.position.set(
      props.position.x,
      props.position.y,
      props.position.z
    );
    mesh.rotation.set(
      props.rotation.x,
      props.rotation.y,
      props.rotation.z
    );
    mesh.scale.set(
      props.scale.x,
      props.scale.y,
      props.scale.z
    );

    this.obj3d = mesh;
    this.obj3d.UNI = this;
    console.log(this)
  }
  _parseGeometry(props){
    if (typeof props.primitive !== "string") props.primitive = "";
    const primitive = GEOMETRIES[props.primitive.toLowerCase()];
    const buffer = props.buffer ? "Buffer" : "";
    switch (primitive) {
      case GEOMETRIES.box:
        return new THREE[primitive+buffer+"Geometry"](
          props.width || props.size,
          props.height || props.size,
          props.depth || props.size,
          props.widthSegments,
          props.heightSegments,
          props.depthSegments
        );
      case GEOMETRIES.circle:
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.cone: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.cylinder: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.dodecahedron: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.edges: 
        return new THREE[primitive+"Geometry"](
        )
      case GEOMETRIES.extrude: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.icosahedron:
        return new THREE[primitive+buffer+"Geometry"](
        ) 
      case GEOMETRIES.lathe: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.octahedron:
        return new THREE[primitive+buffer+"Geometry"](
        ) 
      case GEOMETRIES.parametric:
        return new THREE[primitive+buffer+"Geometry"](
        ) 
      case GEOMETRIES.plane: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.polyhedron:
        return new THREE[primitive+buffer+"Geometry"](
        ) 
      case GEOMETRIES.ring: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.shape: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.sphere: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.tetrahedron:
        return new THREE[primitive+buffer+"Geometry"](
        ) 
      case GEOMETRIES.text: 
        return new THREE[primitive+"Geometry"](
        )
      case GEOMETRIES.torus: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.torusknot:
        return new THREE[primitive+buffer+"Geometry"](
        ) 
      case GEOMETRIES.tube: 
        return new THREE[primitive+buffer+"Geometry"](
        )
      case GEOMETRIES.wireframe:
        return new THREE[primitive+"Geometry"](
        ) 
      default:
        typeof primitive === "string" && console.error(
          'invalid primitive type',
          primitive,
          'passed into UNIMesh'
        );
    }
  }
}

export default UNIMesh