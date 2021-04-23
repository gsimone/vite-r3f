import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Scene() {

  return (
    <mesh>
      <octahedronGeometry />
      <meshNormalMaterial />
    </mesh>
  )

}

function undepth(obj: any) {
  obj.material.depthWrite = false
}

function App() {
  return (
    <div id="canvas">
      <Canvas camera={{ position: [5, 5, 5]}}>
        <color attach="background" args={['#17141F']} />
        
        <group>
          <gridHelper ref={undepth}  renderOrder={9000} args={[1000, 1000, '#17141F', '#060606']} />
          <gridHelper ref={undepth}  renderOrder={9001} color="red" args={[100, 100, '#fff', '#17141F']} scale={10} />
          <axesHelper ref={undepth} renderOrder={9002} scale={20} />
        </group>
        
        <Scene />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App