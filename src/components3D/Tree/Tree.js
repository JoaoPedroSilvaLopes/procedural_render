import { BoxGeometry, CylinderGeometry, Mesh, MeshToonMaterial, Color, NearestFilter, TextureLoader } from 'three';

import fiveToneG from '../../assets/gradientMaps/fiveTone.jpg'

function Tree(height, position) {
  const treeHeight = Math.random() + 1.25;

  // GEOMETRIA
  const geo = new BoxGeometry(0.45, 1, 0.45);
  geo.translate(position.x, height + 0.5, position.y);

  const geo1 = new CylinderGeometry(0, 1.5, treeHeight, 3);
  geo1.translate(position.x, height + treeHeight * 1 , position.y);
  
  const geo2 = new CylinderGeometry(0, 1.15, treeHeight, 3);
  geo2.translate(position.x, height + treeHeight * 1.5, position.y);

  const geo3 = new CylinderGeometry(0, 0.8, treeHeight, 3);
  geo3.translate(position.x, height + treeHeight * 2, position.y);

  // CAULE
  const fiveTone = new TextureLoader().load(fiveToneG)
  fiveTone.minFilter = NearestFilter
  fiveTone.magFilter = NearestFilter

  const materialCaule = new MeshToonMaterial({
    color: new Color('#684132').convertSRGBToLinear(),
    gradientMap: fiveTone,
  })

  const meshCaule = new Mesh(geo, materialCaule)
  meshCaule.castShadow = true
  meshCaule.receiveShadow = true

  // FOLHAS ARVORES
  const materialFolha = new MeshToonMaterial({
    color: new Color('#013f28').convertSRGBToLinear(),
    gradientMap: fiveTone,
  })

  const mesh1 = new Mesh(geo1, materialFolha)
  mesh1.castShadow = true
  mesh1.receiveShadow = true

  const mesh2 = new Mesh(geo2, materialFolha)
  mesh2.castShadow = true
  mesh2.receiveShadow = true

  const mesh3 = new Mesh(geo3, materialFolha)
  mesh3.castShadow = true
  mesh3.receiveShadow = true

  const mesh = ([meshCaule, mesh1, mesh2, mesh3])

  return mesh
}

export default Tree