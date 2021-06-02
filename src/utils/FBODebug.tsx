import * as React from 'react'
import { Text } from '@react-three/drei'
import { WebGLRenderTarget } from 'three'

import './DepthSampleMaterial'

type FBODebugProps = {
  fbo: WebGLRenderTarget,
}

export const FBODebug: React.FC<FBODebugProps> = ({
  fbo,
}) => {

  return <mesh>
    <planeGeometry />
    <meshBasicMaterial map={fbo.texture} />
  </mesh>

}

export const FBODepthDebug: React.FC<FBODebugProps> = ({
fbo,
}) => {

  return <mesh>
    <planeGeometry />
    <depthSampleMaterial u_depth={fbo.depthTexture} />
  </mesh>
}