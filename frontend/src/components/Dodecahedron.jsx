import React, { useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';

const Dodecahedron = () => {
	const ref = useRef();
	const { viewport } = useThree();
	const [clicked, setClicked] = useState(false);

	useFrame(({ pointer }) => {
		if (clicked) {
			const x = (pointer.x * viewport.width) / 2;
			const y = (pointer.y * viewport.height) / 2;
			ref.current.position.set(0, y, -x);
			ref.current.rotation.set(-y, x, 0);
		}
	});

	const handleClick = () => {
		setClicked(!clicked);
	};

	return (
		<mesh ref={ref} castShadow onClick={handleClick}>
			<dodecahedronGeometry />
			<meshLambertMaterial />
		</mesh>
	);
};

export default Dodecahedron;
