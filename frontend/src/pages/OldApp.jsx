import '../App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { useRef } from 'react';

function OldApp() {
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const lastUpdateRef = useRef(0);

	const handlePointerMove = (event) => {
		mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
		mousePositionRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
	};

	const throttleUpdate = (callback) => {
		const now = performance.now();
		if (now - lastUpdateRef.current >= 7) {
			// Throttle to 60fps (1000ms / 60fps = 16.67ms)
			callback();
			lastUpdateRef.current = now;
		}
	};

	const throttledHandlePointerMove = (event) => {
		throttleUpdate(() => {
			handlePointerMove(event);
			//console.log('Mouse position:', mousePositionRef.current);
		});
	};

	const Box = () => {
		const [ref, api] = useBox(() => ({
			mass: 0,
			position: [0, 2, 0],
		}));

		useFrame(() => {
			// Calculate the new position based on the mouse position
			const newX = mousePositionRef.current.x * 12; // You may need to adjust the multiplier for your scene scale
			const newY = mousePositionRef.current.y * 14; // You may need to adjust the multiplier for your scene scale
			api.position.set(newX, newY, 0);
		});

		return (
			<mesh position={[0, 2, 0]} ref={ref}>
				<boxGeometry />
				<meshLambertMaterial color='hotpink' />
			</mesh>
		);
	};

	const Plane = () => {
		const [ref] = usePlane(() => ({
			rotation: [-Math.PI / 2, 0, 0],
		}));
		return (
			<mesh position={[0, 0, 0]} ref={ref}>
				<planeGeometry args={[20, 20]} />
				<meshLambertMaterial color='lightblue' />
			</mesh>
		);
	};

	return (
		<div
			className='bg-gray-900 w-full h-screen'
			onMouseMove={throttledHandlePointerMove}
			onTouchMove={throttledHandlePointerMove}
		>
			<Canvas>
				<OrbitControls />
				<ambientLight intensity={0.5} />
				<spotLight position={[5, 7.5, 5]} intensity={100} angle={0.3} />
				<Physics>
					<Box />

					<Plane />
				</Physics>
			</Canvas>
		</div>
	);
}

export default OldApp;