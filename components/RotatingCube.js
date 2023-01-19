import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

function RotatingCube({ mouseDown, startPosition, currentPosition, setStartPosition }) {
    // Create a ref to store the cube's mesh
    const cubeRef = useRef();
    // Create a ref to store the lines' mesh
    const linesRef = useRef();

    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [speed, setSpeed] = useState(0.005);

    useFrame(() => {
        if (!cubeRef.current) return;

        const cube = cubeRef.current;
        const lines = linesRef.current;
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
            
            // set speed based on the distance between the current position and the starting position, but have a max speed
            const distance = Math.abs(deltaX + deltaY);
            setSpeed(Math.min(distance * 0.002, 0.3));
        } else {
            // retain the rotation in the same direction while slowing down
            setSpeed(speed * 0.99);
            if (speed <= 0.005) {
                setSpeed(0.005);
            }
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
        if (lines) {
            lines.rotation.x = rotationX;
            lines.rotation.y = rotationY;
        }
    });

    const colors = [
        '#f44336', // red
        '#4caf50', // green
        '#2196f3', // blue
        '#ffc107', // yellow
        '#ff5722',  // orange
        '#9c27b0' // purple
    ];
    return (
        <>
            <mesh ref={cubeRef}>
                <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
                {colors.map((color, i) => (
                    <meshBasicMaterial
                        attach={`material-${i}`}
                        key={i}
                        color={color}
                    />
                ))}
            </mesh>
            {cubeRef.current && (
                <lineSegments ref={linesRef}>
                    <edgesGeometry attach="geometry" args={[cubeRef.current.geometry]} />
                    <lineBasicMaterial attach="material" color="black" />   
                </lineSegments>
            )}
        </>
    );
}

export default RotatingCube;