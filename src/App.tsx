import * as React from 'react'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div id="canvas">
      <Canvas>
        <mesh>
          <octahedronGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App