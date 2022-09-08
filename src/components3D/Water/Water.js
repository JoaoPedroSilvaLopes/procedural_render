import { CylinderGeometry, Mesh, MeshToonMaterial, Color, TextureLoader, NearestFilter } from 'three';

//gradientMaps
import threeToneG from '../../assets/gradientMaps/threeTone.jpg'
import fourToneG from '../../assets/gradientMaps/fourTone.jpg'
import fiveToneG from '../../assets/gradientMaps/fiveTone.jpg'

export default function Water(alturaAgua, visibilidade, area) {

  const threeTone = new TextureLoader().load(threeToneG)
  threeTone.minFilter = NearestFilter
  threeTone.magFilter = NearestFilter

  const fourTone = new TextureLoader().load(fourToneG)
  fourTone.minFilter = NearestFilter
  fourTone.magFilter = NearestFilter

  const fiveTone = new TextureLoader().load(fiveToneG)
  fiveTone.minFilter = NearestFilter
  fiveTone.magFilter = NearestFilter

  const seaMesh = new Mesh(
    new CylinderGeometry(area + 2, area + 2, 0.5, area + 2),
    new MeshToonMaterial({
      color: new Color("#1ca3ec").convertSRGBToLinear().multiplyScalar(3),
      gradientMap: fiveTone,
      transparent: true,
      opacity: 0.45, 
      visible: visibilidade,
    })
  );
  seaMesh.castShadow = true;
  //seaMesh.receiveShadow = true;
  seaMesh.material.needsUpdate = true

  seaMesh.rotation.y = -Math.PI * 0.333 * 0.5;
  seaMesh.position.set(0, alturaAgua, 0);

  return seaMesh
}