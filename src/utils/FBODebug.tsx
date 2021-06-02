import * as React from 'react'
import { WebGLRenderTarget } from 'three'

type FBODebugProps = {
  fbo: WebGLRenderTarget
}

const FBODebug: React.FC<FBODebugProps> = ({
  fbo
}) => {

  return <mesh>
    <planeGeometry />
    <meshBasicMaterial map={fbo.texture} />
  </mesh>

}

export default FBODebug