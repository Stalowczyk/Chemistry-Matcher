import React from 'react';
import useMousePosition from '../hooks/useMousePosition';


const Test = () => {
    const cursorPosition = useMousePosition({resolution:6000});

    console.log(cursorPosition)

	return <div className='bg-gray-900 w-full h-screen'></div>;
};

export default Test;
