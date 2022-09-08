import { Vector2 } from 'three';

export default function EspacamentoHexagono(tileX, tileY) {
  //return new Vector2((tileX + (tileY % 2) * 0.5) * 1.77, tileY * 1.535)
  return new Vector2((tileX + (tileY % 2) * 0.5) * 1.730, tileY * 1.495)
}