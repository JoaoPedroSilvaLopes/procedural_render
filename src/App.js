import './App.css';
import { useEffect, useState } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"
import { createNoise2D } from 'simplex-noise';

//componentes3D
import Stones from './components3D/Stones/Stones';
import Tree from './components3D/Tree/Tree';
import Cloud from './components3D/Cloud/Cloud';
import Water from './components3D/Water/Water';
import Iluminacao from './components3D/Iluminacao/Iluminacao';
import HexagonoGeometria from './components3D/FormasGeometricas/Hexagono/HexagonoGeometria';
import Terrain from './components3D/Terrain/Terrain';
import EspacamentoHexagono from './components3D/FormasGeometricas/Hexagono/EspacamentoHexagono';
import { render } from 'react-dom';

export default function App() {
  const [area, setArea] = useState(25)
  const [biome, setBiome] = useState('forest')
  const [alturaMaxima, setAlturaMaxima] = useState(3.5)
  const [alturaPedra, setAlturaPedra] = useState(0)
  const [alturaTerra, setAlturaTerra] = useState(3.5)
  const [alturaGrama, setAlturaGrama] = useState(3)
  const [alturaAreia, setAlturaAreia] = useState(0.5)
  const [alturaTerra2, setAlturaTerra2] = useState(0.2)
  const [alturaAgua, setAlturaAgua] = useState([0.15, true])

  let scene = new THREE.Scene()

  function increase() {
    scene = null
    const areaMais = area + 10
    setArea(areaMais)
  }

  function decrease() {
    scene = null
    const areaMenos = area - 10
    setArea(areaMenos)
  }

  function changeBiome(biomeSelect) {
    scene = null
    if (biomeSelect === 'desert') {
      setBiome('desert')
      setAlturaMaxima(4)
      setAlturaPedra(0)
      setAlturaTerra(0)
      setAlturaGrama(0)
      setAlturaAreia(4)
      setAlturaTerra2(0)
      setAlturaAgua([0, false])
    }
    else if (biomeSelect === 'forest') {
      setBiome('forest')
      setAlturaMaxima(3.5)
      setAlturaPedra(0)
      setAlturaTerra(3.5)
      setAlturaGrama(3)
      setAlturaAreia(0.5)
      setAlturaTerra2(0.2)
      setAlturaAgua([0.15, true])
    }
    else if (biomeSelect === 'mountain') {
      setBiome('mountain')
      setAlturaMaxima(15)
      setAlturaPedra(15)
      setAlturaTerra(3.5)
      setAlturaGrama(2)
      setAlturaAreia(1)
      setAlturaTerra2(0.5)
      setAlturaAgua([0.8, true])
    }
  }

  useEffect(() => {
    const noise2D = createNoise2D()

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000)
    camera.position.set(0, 30, 90)

    const pointLuz = Iluminacao()[1]
    const clouds = Cloud()
    const water = Water(alturaAgua[0], alturaAgua[1], area)

    scene.autoUpdate = true
    scene.background = new THREE.Color("#FFEECC")
    scene.add(Iluminacao()[0], pointLuz, Iluminacao()[2], clouds, water,)

    const canvas = document.getElementById('threejs')
    const renderer = new THREE.WebGL1Renderer({canvas, antialias: true})

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement)

    new OrbitControls(camera, renderer.domElement)

    let terra = new THREE.BoxGeometry(0, 0, 0)
    let terra2 = new THREE.BoxGeometry(0, 0, 0)
    let pedra = new THREE.BoxGeometry(0, 0, 0)
    let areia = new THREE.BoxGeometry(0, 0, 0)
    let grama = new THREE.BoxGeometry(0, 0, 0)

    const Hexagono = (height, position) => {
      const geo = HexagonoGeometria(height, position)

      if (height <= alturaTerra2) {
        terra2 = BufferGeometryUtils.mergeBufferGeometries([geo, terra2])
      }
      else if (height <= alturaAreia) {
        areia = BufferGeometryUtils.mergeBufferGeometries([geo, areia])
        if(Math.random() > 0.8) {
          areia = BufferGeometryUtils.mergeBufferGeometries([areia, Stones(height, position)]);
        }
      }
      else if (height <= alturaGrama) {
        grama = BufferGeometryUtils.mergeBufferGeometries([geo, grama])
        if(Math.random() > 0.90) {
          const tree = Tree(height, position)
          scene.add(tree[0])
          scene.add(tree[1])
          scene.add(tree[2])
          scene.add(tree[3])
        }
      }
      else if (height <= alturaTerra) {
        terra = BufferGeometryUtils.mergeBufferGeometries([geo, terra])
      }
      else if (height <= alturaPedra) {
        pedra = BufferGeometryUtils.mergeBufferGeometries([geo, pedra])
        if(Math.random() > 0.8) {
          pedra = BufferGeometryUtils.mergeBufferGeometries([pedra, Stones(height, position)]);
        }
      }
    }

    async function createTerraForm () {
      for(let i = -area; i <= area; i++) {
        for(let j = -area; j <= area; j++) {
          const position = EspacamentoHexagono(i, j)
          
          if(position.length() > area + 1) continue

          let noise = (noise2D(i * 0.1, j * 0.1) + 1) * 0.5
          noise = Math.pow(noise, 1.5)

          Hexagono(noise * alturaMaxima, position, alturaMaxima)
        }
      }

      const stoneMesh = Terrain(pedra, "#808080")
      const grassMesh = Terrain(grama, "#567d46")
      const dirtMesh = Terrain(terra, "#684132")
      const dirtMesh2 = Terrain(terra2, "#6f645c")
      const sandMesh = Terrain(areia, "#f6d7b0")
      scene.add(stoneMesh, grassMesh, dirtMesh, dirtMesh2, sandMesh)

      const animate = () => {
        const time = Date.now() * 0.0005
        pointLuz.position.x = Math.sin(time) * 10
        pointLuz.position.z = Math.sin(time) * 10

        clouds.position.x = Math.sin(time) * 1
        clouds.position.z = Math.sin(time) * 1

        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
      }
      animate()
    }
    createTerraForm()
  }, [biome, area])

  return (
    <div className='App'>
      <header>
        <button className="biomeButton" onClick={ () => changeBiome('forest') }>FOREST</button>
        <button className="biomeButton" onClick={ () => changeBiome('desert') }>DESERT</button>
        <button className="biomeButton" onClick={ () => changeBiome('mountain') }>MOUNTAIN</button>
        <button className="teste" onClick={ () => increase() }>teste+</button>
        <button className="teste" onClick={ () => decrease() }>teste-</button>
      </header>
      <main>
        <canvas id="threejs"></canvas>
      </main>
    </div>
  );
}