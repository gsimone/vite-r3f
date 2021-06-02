import * as THREE from 'three';
import * as React from 'react';
import { Canvas, createPortal, extend, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera, useFBO } from '@react-three/drei';

import { Toaster } from 'react-hot-toast';

import { FBODebug, FBODepthDebug, FBOGUI, OrbitControls, TransformControls } from './utils';

import ShaderMaterial from './ShaderMaterial';
import DebugGrid from './utils/DebugGrid';
import useStore from './store';

function Scene() {
	const [ref, setRef] = React.useState(null!);

	const fbo = useFBO(256, 256, {
		depthBuffer: true,
		depthTexture: new THREE.DepthTexture(256, 256),
	});

	React.useEffect(() => {
		useStore.setState((draft) => {
			draft.fbos['test'] = fbo;
		});
	}, [fbo]);

	useFrame(({ gl, scene, camera }) => {
		gl.setRenderTarget(fbo);
		gl.render(scene, camera);
	}, 2);

	return (
		<>
			<TransformControls object={ref} />

			<mesh ref={setRef}>
				<octahedronGeometry />
				<meshNormalMaterial />
			</mesh>

			<mesh position-x={-10} scale={4}>
				<octahedronGeometry />
				<meshNormalMaterial />
			</mesh>
		</>
	);
}

function GUI() {
	const firstFBO = useStore((state) => state.fbos.test);
	const [guiScene] = React.useState(new THREE.Scene());
	const guiCamera = React.useRef();

	useFrame(({ gl }) => {
		// render GUI panels on top of main scene
		gl.render(guiScene, guiCamera.current);
		gl.autoClear = true;
	}, 12);

	return (
		<>
			{createPortal(
				<FBOGUI>
					{firstFBO && <FBODebug name="Main" fbo={firstFBO} />}
					{firstFBO && <FBODepthDebug name="Depth" fbo={firstFBO} />}
				</FBOGUI>,
				guiScene
			)}

			<OrthographicCamera ref={guiCamera} near={0.0001} far={1} />
		</>
	);
}

function Renderer() {
	useFrame(({ gl }) => {
		gl.autoClear = false;
	}, -1);

	useFrame(({ gl, scene, camera }) => {
		gl.setRenderTarget(null);
		gl.render(scene, camera);
	}, 10);

	useFrame(({ gl }) => {
		gl.autoClear = true;
	}, 20);

	return null;
}

function App() {
	return (
		<div id="canvas">
			<Canvas camera={{ position: [5, 5, 5], near: 0.1, far: 1000 }}>
				<GUI />

				<color attach="background" args={['#17141F']} />

				<DebugGrid />

				<Scene />
				<OrbitControls />

				<Renderer />
			</Canvas>

			<div>
				<Toaster />
			</div>
		</div>
	);
}

export default App;
