import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Box from './components/Box';
import Plane from './components/Plane';
import Dodecahedron from './components/Dodecahedron';

function App() {
	return (
		<div className='bg-gray-900 w-full h-screen'>
			<Canvas>
				<PerspectiveCamera makeDefault position={[10, 10, 0]} />
				<OrbitControls />
				<ambientLight intensity={0.5} />
				<spotLight position={[0, 10, 0]} intensity={100} angle={1} />
				<Physics>
					<Box />
					<Plane />
					<Dodecahedron />
				</Physics>
			</Canvas>
		</div>
	);
}

export default App;
