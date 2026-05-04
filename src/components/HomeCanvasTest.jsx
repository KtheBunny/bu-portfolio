import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Line } from '@react-three/drei';
import { useRef, useState, useCallback } from 'react';

function Scene({ leftVal, rightVal }) {
  const leftTexture = useTexture('https://pbs.twimg.com/media/Gwx9TqXbsAAczsJ?format=jpg&name=large');
  const midTexture = useTexture('https://pbs.twimg.com/media/G5I_zoNasAAJql_?format=jpg&name=large');
  const rightTexture = useTexture('https://pbs.twimg.com/media/G79dW35agAcWrP0?format=jpg&name=4096x4096');

  const smoothLeft = useRef(leftVal);
  const smoothRight = useRef(rightVal);

  useFrame((state, delta) => {
    const factor = 1 - Math.exp(-delta * 5);
    smoothLeft.current += (leftVal - smoothLeft.current) * factor;
    smoothRight.current += (rightVal - smoothRight.current) * factor;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <mesh position={[-2, 0, 0]} scale={[smoothLeft.current * 4, 2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={leftTexture} />
      </mesh>
      <mesh position={[0, 0, 0]} scale={[(smoothRight.current - smoothLeft.current) * 4, 2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={midTexture} />
      </mesh>
      <mesh position={[2, 0, 0]} scale={[(1 - smoothRight.current) * 4, 2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={rightTexture} />
      </mesh>
      <Line
        points={[[smoothLeft.current * 4 - 2, -1, 0], [smoothLeft.current * 4 - 2, 1, 0]]}
        color="white"
        lineWidth={2}
      />
      <Line
        points={[[smoothRight.current * 4 - 2, -1, 0], [smoothRight.current * 4 - 2, 1, 0]]}
        color="white"
        lineWidth={2}
      />
    </>
  );
}

export default function HomeCanvasTest() {
  const [leftVal, setLeftVal] = useState(0.33);
  const [rightVal, setRightVal] = useState(0.66);

  const updateSeparators = useCallback((x) => {
    let l, r;
    if (x < 0.33) {
      l = 0.8; r = 0.9;
    } else if (x <= 0.66) {
      l = 0.1; r = 0.9;
    } else {
      l = 0.1; r = 0.2;
    }
    setLeftVal(l);
    setRightVal(r);
  }, []);

  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    updateSeparators(x);
  }, [updateSeparators]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      onPointerMove={handlePointerMove}
      style={{
        position: 'absolute',
        left: '3.5rem',
        width: 'calc(100vw - 3.5rem)',
        height: '100vh',
        background: '#000'
      }}
    >
      <Scene leftVal={leftVal} rightVal={rightVal} />
    </Canvas>
  );
}