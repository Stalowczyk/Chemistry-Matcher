import React, { useEffect, useRef, useState } from 'react';
import { useBox } from '@react-three/cannon';
import useMousePosition from '../hooks/useMousePosition';
import { useFrame, useThree } from '@react-three/fiber';

const Box = () => {
    const cursorPosition = useMousePosition();
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 1, 4], // Initial position
    }));

	const { viewport } = useThree();
	const [clicked, setClicked] = useState(false);
    
	useFrame(({ pointer }) => {
		if (clicked) {
			const x = (pointer.x * viewport.width) / 2;
			const y = (pointer.y * viewport.height) / 2;
			api.mass.set(0)
			api.position.set(0, y, -x);
			api.rotation.set(-y, x, 0);
		}
	});

	const handleClick = () => {
		setClicked(!clicked);
	};

    const updatePosition = () => {
        api.position.set(0, cursorPosition.y, cursorPosition.x);
    };



    return (
        <mesh ref={ref} onClick={handleClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color='hotpink' />
        </mesh>
    );
};

export default Box;
