import { SphereGeometry, Mesh, MeshToonMaterial, BoxGeometry } from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"

export default function Cloud() {
  let geo = new SphereGeometry(0, 0, 0); 
  let count = Math.floor(Math.pow(Math.random(), 0.45) * 10);

  for(let i = 0; i < count; i++) {
    const puff1 = new BoxGeometry(7.5, 2, 7);

    const min = Math.ceil(-25);
    const max = Math.floor(25);
    const cloudGeo = BufferGeometryUtils.mergeBufferGeometries([puff1]);
    
    cloudGeo.translate(
      Math.floor(Math.random() * (max - min + 1)) + min, 
      Math.floor(Math.random() * (max - 20 + 1)) + 20, 
      Math.floor(Math.random() * (max - min + 1)) + min
    );

    geo = BufferGeometryUtils.mergeBufferGeometries([geo, cloudGeo]);
  }
  
  const cloudMesh = new Mesh(
    geo,
    new MeshToonMaterial({
      color: 0xffffff,
    })
  );
  cloudMesh.castShadow = true;
  //cloudMesh.receiveShadow = true;
  //cloudMesh.material.needsUpdate = true
  
  return cloudMesh
}