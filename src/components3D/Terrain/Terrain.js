import { Mesh, MeshToonMaterial, Color, TextureLoader, NearestFilter } from 'three';

//gradientMaps
import threeToneG from '../../assets/gradientMaps/threeTone.jpg'
import fourToneG from '../../assets/gradientMaps/fourTone.jpg'
import fiveToneG from '../../assets/gradientMaps/fiveTone.jpg'

export default function Terrain(geografia, color) {

  const threeTone = new TextureLoader().load(threeToneG)
  threeTone.minFilter = NearestFilter
  threeTone.magFilter = NearestFilter

  const fourTone = new TextureLoader().load(fourToneG)
  fourTone.minFilter = NearestFilter
  fourTone.magFilter = NearestFilter

  const fiveTone = new TextureLoader().load(fiveToneG)
  fiveTone.minFilter = NearestFilter
  fiveTone.magFilter = NearestFilter

  const material = new MeshToonMaterial({
    color: new Color(color).convertSRGBToLinear(),
    gradientMap: fiveTone,
  })
    
  const mesh = new Mesh(geografia, material)
  mesh.castShadow = true
  //mesh.receiveShadow = true
  mesh.material.needsUpdate = true

  //mesh.shadow.mapSize.width = 4096; 
  //mesh.shadow.mapSize.height = 4096; 

  return mesh
}