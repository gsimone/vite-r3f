import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as React from 'react';
import isValidRef from './utils/isValidRef';

import useMaterialDebug from './utils/useMaterialDebug'

const MyMaterial = shaderMaterial(
	{
		u_time: 0,
	},
	/* glsl */ 
`varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}`,
	/* glsl */ 
`uniform float u_time;
varying vec2 vUv;

void main() {
  float test = 1.;
  gl_FragColor = vec4(vUv, (sin(u_time * 2.) + 1.) * 0.5, 1.);
}`
);

extend({ MyMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      myMaterial: typeof MyMaterial
    }
  }
}

// @refresh reset
function MaterialWrapper() {
  useMaterialDebug(MyMaterial)

	const materialRef = React.useRef(null!);

	useFrame(({ clock }) => {
		if (isValidRef(materialRef.current)) {
      // @ts-ignore
			materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
		}
	});


  return <myMaterial ref={materialRef} />
}

export default MaterialWrapper;
