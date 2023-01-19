import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingCube() {
    // Create a ref to store the cube's mesh
    const cubeRef = useRef();

    const [speed, setSpeed] = useState(0.1);
    // State to keep track of the drag
    const [mouseDown, setMouseDown] = useState(false);
    const [startPosition, setStartPosition] = useState(new THREE.Vector3(0, 0, 1));
    const [currentPosition, setCurrentPosition] = useState(new THREE.Vector3(0, 0, 1));
    const [lastMoveTimestamp, setLastMoveTimestamp] = useState(null);
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    useFrame(() => {
        if (!cubeRef.current) return;

        const cube = cubeRef.current;
        // Update the cube's quaternion based on the drag
        if (mouseDown) {
            // Calculate the difference between the current position and the starting position
            const deltaX = currentPosition.x - startPosition.x;
            const deltaY = currentPosition.y - startPosition.y;

            // Update the cube's quaternion
            setRotationX(rotationX - deltaY * 0.01);
            setRotationY(rotationY + deltaX * 0.01);

            // Save the current position as the starting position for the next movement
            setStartPosition(currentPosition);
            
            setSpeed(0.1);
        } else {
            // retain the rotation in the same direction
            setSpeed(speed * 0.99);
            if (speed < 0) setSpeed(0);
            const mouseMovingUp = currentPosition.y < startPosition.y;
            const mouseMovingDown = currentPosition.y > startPosition.y;
            const mouseMovingLeft = currentPosition.x < startPosition.x;
            const mouseMovingRight = currentPosition.x > startPosition.x;
            if (mouseMovingUp) setRotationX(rotationX + speed);
            if (mouseMovingDown) setRotationX(rotationX - speed);
            if (mouseMovingLeft) setRotationY(rotationY - speed);
            if (mouseMovingRight) setRotationY(rotationY + speed);
        }
        cube.rotation.x = rotationX;
        cube.rotation.y = rotationY;
    });

    return (
        <mesh
            ref={cubeRef}
            onPointerDown={e => {
                setMouseDown(true);
                setStartPosition({ x: e.clientX, y: e.clientY });
            }}
            onPointerMove={e => {
                if (!mouseDown) return;
                setCurrentPosition({ x: e.clientX, y: e.clientY });
            }}
            onPointerUp={() => {
                setMouseDown(false);
                setLastMoveTimestamp(Date.now());
            }}
            onPointerLeave={() => {
                setMouseDown(false);
                setLastMoveTimestamp(Date.now());
            }}
        >
            <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
            <meshStandardMaterial attach="material" color="hotpink" />
        </mesh>
    );
}


export default RotatingCube;