import { useEffect, useState, useRef } from 'react';

const useMousePosition = (fps = 144) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const lastUpdateRef = useRef(0);

    useEffect(() => {
        // Calculate throttle time based on desired FPS
        const throttleTime = Math.ceil(1000 / fps);

        const handlePointerMove = (event) => {
            setCursorPosition({
                x: ((event.clientX / window.innerWidth) * 2 - 1) * 10 * -1,
                y: (-(event.clientY / window.innerHeight) * 2 + 1) * 10,
            });
        };

        const throttleUpdate = (callback) => {
            const now = performance.now();
            if (now - lastUpdateRef.current >= throttleTime) {
                callback();
                lastUpdateRef.current = now;
            }
        };

        const throttledHandlePointerMove = (event) => {
            throttleUpdate(() => {
                handlePointerMove(event);
            });
        };

        window.addEventListener('mousemove', throttledHandlePointerMove);
        window.addEventListener('touchmove', throttledHandlePointerMove);

        return () => {
            window.removeEventListener('mousemove', throttledHandlePointerMove);
            window.removeEventListener('touchmove', throttledHandlePointerMove);
        };
    }, [fps]);

    return cursorPosition;
};

export default useMousePosition;
