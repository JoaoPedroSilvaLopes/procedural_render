import { CylinderGeometry } from 'three';

export default function HexagonoGeometria(height, position) {
  const geo = new CylinderGeometry(1, 1, height, 6, 1, false)
  geo.translate(position.x, height * 0.5, position.y)
  return geo
}