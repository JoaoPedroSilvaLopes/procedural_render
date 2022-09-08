import { BoxGeometry } from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"

import HexagonoGeometria from './HexagonoGeometria';
import Terrain from '../../Terrain/Terrain';
import Tree from '../../Tree/Tree';
import Stones from '../../Stones/Stones';

let terra = new BoxGeometry(0, 0, 0)
let terra2 = new BoxGeometry(0, 0, 0)
let pedra = new BoxGeometry(0, 0, 0)
let areia = new BoxGeometry(0, 0, 0)
let grama = new BoxGeometry(0, 0, 0)

export default function Hexagono(height, position, alturaMaxima) {

  const alturaPedra = alturaMaxima * 0.8;
  const alturaTerra = alturaMaxima * 0.7;
  const alturaGrama = alturaMaxima * 0.5;
  const alturaAreia = alturaMaxima * 0.3;
  const alturaTerra2 = alturaMaxima * 0;

  const geo = HexagonoGeometria(height, position)

  if (height >= alturaPedra) {
    pedra = BufferGeometryUtils.mergeBufferGeometries([geo, pedra])
    if(Math.random() > 0.8) {
      pedra = BufferGeometryUtils.mergeBufferGeometries([pedra, Stones(height, position)]);
    }
  }
  else if (height >= alturaTerra) {
    terra = BufferGeometryUtils.mergeBufferGeometries([geo, terra])
  }
  else if (height >= alturaGrama) {
    grama = BufferGeometryUtils.mergeBufferGeometries([geo, grama])
    if(Math.random() > 0.8) {
      grama = BufferGeometryUtils.mergeBufferGeometries([grama, Tree(height, position)]);
    }
  }
  else if (height >= alturaAreia) {
    areia = BufferGeometryUtils.mergeBufferGeometries([geo, areia])
    if(Math.random() > 0.8) {
      areia = BufferGeometryUtils.mergeBufferGeometries([areia, Stones(height, position)]);
    }
  }
  else if (height >= alturaTerra2) {
    terra2 = BufferGeometryUtils.mergeBufferGeometries([geo, terra2])
  }

  const stoneMesh = Terrain(pedra, 0x918E85)
  const grassMesh = Terrain(grama, 0x567d46)
  const dirtMesh = Terrain(terra, 0x6F4E37)
  const dirtMesh2 = Terrain(terra2, 0x967969)
  const sandMesh = Terrain(areia, 0xC2B280)

  return [stoneMesh, grassMesh, dirtMesh, dirtMesh2, sandMesh]
}
