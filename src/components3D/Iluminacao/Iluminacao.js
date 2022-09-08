import { AmbientLight, PointLight, Color, DirectionalLight, CameraHelper, PointLightHelper } from 'three';

export default function Iluminacao() {
  const luzAmbiente = new AmbientLight(0xffccee, 0.3)
  //luzAmbiente.castShadow = true

  // const luzSpot = new SpotLight(0xffffff, 1)
  // luzSpot.castShadow = true;
  // luzSpot.position.set(0, 64, 32)

  const pontoLuz = new PointLight(new Color("#f9f4d9").convertSRGBToLinear().convertSRGBToLinear(), 3, 80)
  pontoLuz.position.set(0, 40, 0)
  pontoLuz.castShadow = true


  pontoLuz.shadow.mapSize.width = 4096
  pontoLuz.shadow.mapSize.height = 4096
  //pontoLuz.shadow.camera.near = 0.5
  //pontoLuz.shadow.camera.far = 100

  return [luzAmbiente, pontoLuz, new PointLightHelper(pontoLuz, 0.5, 0xf9f4d9)]
}