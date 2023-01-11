import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Planet = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();

    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view
    return (
        <>
            <mesh
                position={props.position}
                ref={ref}
                scale={props.size}
                onClick={(e) => console.log('click')}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={props.color} />
            </mesh>
            <Ecliptic xRadius={props.xRadius} zRadius={props.zRadius}/>
        </>
    )
}

const Ecliptic = ({ xRadius = 1, zRadius = 1}) => {

    const points = [];
      for (let index = 0; index < 64; index++) {
        const angle = (index / 64) * 2 * Math.PI;
        const x = xRadius * Math.cos(angle);
        const z = zRadius * Math.sin(angle);
        points.push(new THREE.Vector3(x, 0, z));
      }
    points.push(points[0]);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      return (
        <line geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
        </line>
      );
}


const SolarSystem = () => {
    const scalingFactor = 500;
    const sizeScalingFactor = 20;
    const asteroidColor = "#7f7f7f";
    const asteroidSize = 0.2*sizeScalingFactor;
    const asteroidCount = 2000;
    const semiMajorAxis = 3.6 * scalingFactor;
    const semiMinorAxis = 3.2 * scalingFactor;
    const angleIncrement = (Math.PI * 2) / asteroidCount;

    return (
        <div className='canvas'>
            <Canvas camera={{ position: [2600, 1500, -600], fov: 45, far: 60000, near:0.1}}>
                
                <OrbitControls />
                <ambientLight />
                { /* Render the sun and the light */ }
                <pointLight position={[0, 0, 0]}/>
                <Planet color={"#E1DC59"} size={350} position={[0, 0, 0]}/>
                { /* Render the planets */ }

                { /* Mercury */ }
                <Planet color={"#B8B8B8"} size={2*sizeScalingFactor} position={[1*scalingFactor, 0, 0]} xRadius={1*scalingFactor} zRadius={1*scalingFactor}/>
                { /* Venus */ }
                <Planet color={"#E1DC59"} size={2.3*sizeScalingFactor} position={[1.42*scalingFactor, 0, 0]} xRadius={1.42*scalingFactor} zRadius={1.42*scalingFactor}/>
                { /* Earth */ }
                <Planet color={"#2E8B57"} size={2.5*sizeScalingFactor} position={[1.8*scalingFactor, 0, 0]} xRadius={1.8*scalingFactor} zRadius={1.8*scalingFactor}/>
                { /* Mars */ }
                <Planet color={"#B22222"} size={2.3*sizeScalingFactor} position={[2.32*scalingFactor, 0, 0]} xRadius={2.32*scalingFactor} zRadius={2.32*scalingFactor}/>

                {/*Asteroid Belt */}
                {Array.from({ length: asteroidCount }, (_, i) => {
                    const angle = angleIncrement * i;
                    const x = semiMajorAxis * Math.cos(angle);
                    const y = semiMinorAxis * Math.sin(angle);
                    const randomness = Math.random() * 100 - 50; // adding a random value between -50 and 50
                    return (
                      <mesh 
                            key={i} 
                            position={[x + randomness, randomness/2, y + randomness]}
                            scale={[asteroidSize, asteroidSize, asteroidSize]}
                        >
                            <sphereGeometry args={[1, 32, 32]} />
                            <meshStandardMaterial color={asteroidColor} />
                        </mesh>
                    );
                })}

                { /* Jupiter */ }
                <Planet color={"#F1C40F"} size={7.5*sizeScalingFactor} position={[5.2*scalingFactor, 0, 0]} xRadius={5.2*scalingFactor} zRadius={5.2*scalingFactor} />
                { /* Saturn */ }
                <Planet color={"#F1C40F"} size={5.5*sizeScalingFactor} position={[7.58*scalingFactor, 0, 0]} xRadius={7.58*scalingFactor} zRadius={7.58*scalingFactor} />
                { /* Uranus */ }
                <Planet color={"#F1C40F"} size={4.5*sizeScalingFactor} position={[15.18*scalingFactor, 0, 0]} xRadius={15.18*scalingFactor} zRadius={15.18*scalingFactor} />
                { /* Neptune */ }
                <Planet color={"#F1C40F"} size={4.3*sizeScalingFactor} position={[20.07*scalingFactor, 0, 0]} xRadius={20.07*scalingFactor} zRadius={20.07*scalingFactor} />
            </Canvas>
        </div>
    )
}

export default SolarSystem;