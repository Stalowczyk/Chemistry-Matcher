import React from 'react';
import { usePlane } from '@react-three/cannon';

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

export default Plane;
