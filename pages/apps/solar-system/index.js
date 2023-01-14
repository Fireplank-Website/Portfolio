import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ring, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useDisclosure } from '@chakra-ui/react';
import { AiFillFastForward } from 'react-icons/ai';
import { BsPauseFill, BsPlayFill, BsQuestionCircle } from 'react-icons/bs';
import * as THREE from 'three';
import Dialog from '../../../components/Solar-System/Dialogue';
import { planets } from '../../../constants/constants';

const Planet = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    if (ref.current) {
        ref.current.name = props.name;
    }
    // Load the textures
    const texture = useLoader(THREE.TextureLoader, props.texture);
    useFrame((state, delta) => {
        if (props.paused) {
            state.clock.stop();
        } else if (state.clock.running === false) {
            const old = state.clock.elapsedTime;
            state.clock.start();
            state.clock.elapsedTime = old;
        }

        // prevent camera from clipping with background
        const camera = state.camera;
        // calculate distance from camera to 0,0,0
        const cameraDistance = Math.sqrt(camera.position.x * camera.position.x + camera.position.y * camera.position.y + camera.position.z * camera.position.z);
        if (cameraDistance > 54000) {
            const newCameraPosition = state.camera.position.normalize().multiplyScalar(54000);
            state.camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
        }
        
        // check if camera is clipping with planet (this code took way too long to figure out)
        if (props.controls) {
            props.raycaster.set(props.controls.current.target, props.dir.subVectors(camera.position, props.controls.current.target).normalize());
            const intersects = props.raycaster.intersectObject(ref.current);
            if (intersects.length > 0) {
                // check if camera is inside planet
                if (intersects[0].distance + props.size + 70 > cameraDistance && cameraDistance > intersects[0].distance) {
                    var boost = 50; 
                    if (props.size > 100) {
                        boost = 180;
                    }
                    // block camera from clipping with planet by moving it back
                    const newCameraPosition = props.dir.multiplyScalar(intersects[0].distance + props.size + boost);
                    camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
                }   
            }
        }
        
        const gameSpeed = props.gameSpeed <= 60 ? props.gameSpeed / 50 : props.gameSpeed <= 85 ? props.gameSpeed / 5 : props.gameSpeed;
        // Rotate the planet
        ref.current.rotation.y += delta * gameSpeed / 10;

        if (props.sun) return;

        // props.speed is the km/h speed of the planet
        const speed = ((props.speed / 1000 / 60 / 60) * 2000) * gameSpeed;
        const t = state.clock.getElapsedTime() * speed + props.offset;

        const x = props.xRadius * Math.cos(t);
        const z = props.zRadius * Math.sin(t);
        ref.current.position.x = x;
        ref.current.position.z = z;
    });
    // Return the view
    return (
        <>
            <mesh
                position={props.position}
                ref={ref}
                scale={props.size}
                onClick={() => {
                    props.setDialogData({'title':props.name,
                    details:`Distance from Sun: ${props.distanceFromSun}\\n
                    Rotation Period: ${props.rotationPeriod}\\n
                    Orbital Period: ${props.orbitalPeriod}\\n
                    Gravity: ${props.gravity}\\n
                    Surface Area: ${props.surfaceArea}`})
                    if (props.dialogData && props.isDialogOpen && props.dialogData.title !== props.name) return;
                    props.setIsDialogOpen(!props.isDialogOpen);
                }}
            >
                <sphereGeometry args={[1, 32, 32]} />
                {props.sun ? <meshBasicMaterial map={texture} /> : <meshStandardMaterial map={texture} />}
            </mesh>
            <Ecliptic xRadius={props.xRadius} zRadius={props.zRadius}/>
            {props.ring && <Ring radius={props.ringRadius} tube={props.ringTube} position={props.position} color={props.ringColor} planetRef={ref} />}
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

const Ring = ({ radius = 1, tube = 10, radialSegments = 64, tubularSegments = 64, position = [0, 0, 0], color = 'white', planetRef }) => {
    const ringRef = useRef();

    useFrame((state, delta) => {
        if(ringRef.current && planetRef.current) {
            ringRef.current.position.x = planetRef.current.position.x;
            ringRef.current.position.y = planetRef.current.position.y;
            ringRef.current.position.z = planetRef.current.position.z;
            ringRef.current.rotation.z += delta / 10;
        }
    });

    return (
        <mesh position={position} rotation={[Math.PI / 2, 0, 0]} ref={ringRef}>
            <torusGeometry 
            args={[radius, tube, radialSegments, tubularSegments]} 
            />
            <meshStandardMaterial 
            color={color}
            transparent
            opacity={0.8}
            />
        </mesh>
    )
};


const Initalize = (props) => {
    // load background
    const background = useLoader(THREE.TextureLoader, '/textures/milky_way.jpg');

    return (
        <mesh>
            <sphereGeometry args={[55000, 64, 64]} />
            <meshBasicMaterial map={background} side={THREE.BackSide} />
        </mesh>
    )
}

const SolarSystem = () => {
    const scalingFactor = 500;
    const sizeScalingFactor = 20;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [planetMeshes, setPlanetMeshes] = useState([]);


    const raycaster = new THREE.Raycaster();
    const dir = new THREE.Vector3();
    
    const controls = useRef();

    // Asteroid Belt
    const asteroidColor = "#7f7f7f";
    const asteroidSize = 0.2*sizeScalingFactor;
    const asteroidCount = 2000;
    const semiMajorAxis = 3.6 * scalingFactor;
    const semiMinorAxis = 3.2 * scalingFactor;
    const angleIncrement = (Math.PI * 2) / asteroidCount;

    // Pause and slider controls
    const [paused, setPaused] = useState(false);
    const [speed, setSpeed] = useState(50);

    // calculate random offset for asteroids
    const asteroidOffsets = useRef(
        Array.from({ length: asteroidCount }, () => Math.random() * 100 - 50)
    );

    return (
        <div className='canvas'>
            {isDialogOpen && <Dialog 
                hideDialog={() => setIsDialogOpen(false)}
                dialogData={dialogData}
            />}
            <Modal isOpen={isOpen} onClose={onClose} returnFocusOnClose={false}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Usage Guide</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>Click on a planet to view more information about it.</p>
                    <p>Use the slider to control the speed of the planets.</p>
                    <p>Click on the play/pause button to pause the planets.</p>
                    <p>Drag the mouse (or touch on mobile) to rotate the camera.</p>
                    <p>Use the scrollwheel (or pinch on mobile) to zoom in and out.</p>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            
            <div className='controls'>
                <button onClick={() => setPaused(!paused)}>
                    {paused ? <BsPlayFill size={30}/> : <BsPauseFill size={30}/>}
                </button>
                <Slider aria-label='slider-ex-4' defaultValue={50} min={1} onChangeEnd={(val) => setSpeed(val)}>
                    <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                    <Icon as={AiFillFastForward} color='tomato' />
                    </SliderThumb>
                </Slider>
                { /* Add question mark icon that when pressed will open a modal explaining how to use the app */}
                <button onClick={onOpen}>
                    <BsQuestionCircle size={30}/>
                </button>

            </div>
            
            <Canvas camera={{ position: [2600, 1500, -600], fov: 45, far: 110000, near:0.1 }}>
                <Suspense fallback={null}>
                    <Initalize />
                    <OrbitControls minDistance={500} maxDistance={50000} ref={controls} />
                    <ambientLight intensity={0.25}/>
                    { /* Render the sun and the light */ }
                    <pointLight position={[0, 0, 0]} intensity={1.5}/>   
                    <Planet color={"#E1DC59"} size={350} position={[0, 0, 0]} xRadius={0} zRadius={0}
                        texture={'/textures/sun.jpg'} sun={true} paused={paused} gameSpeed={speed} name={"Sun"} distanceFromSun={"0 km"} orbitalPeriod={"0 days"} rotationPeriod={"25 days"}
                        surfaceArea={"1.4 million km²"} gravity={"274 m/s²"} setIsDialogOpen={setIsDialogOpen} isDialogOpen={isDialogOpen} setDialogData={setDialogData} dialogData={dialogData}
                        planetMeshes={planetMeshes} setPlanetMeshes={setPlanetMeshes}
                    />

                    { /* Render the planets */ }
                    {planets.map((planet, i) => (
                        <Planet
                            key={i}
                            name={planet.name}
                            distanceFromSun={planet.distanceFromSun}
                            orbitalPeriod={planet.orbitalPeriod}
                            rotationPeriod={planet.rotationPeriod}
                            surfaceArea={planet.surfaceArea}
                            gravity={planet.gravity}
                            color={planet.color}
                            size={planet.size}
                            position={planet.position}
                            offset={planet.offset}
                            xRadius={planet.xRadius}
                            zRadius={planet.zRadius}
                            speed={planet.speed}
                            texture={planet.texture}
                            paused={paused}
                            gameSpeed={speed}
                            setIsDialogOpen={setIsDialogOpen}
                            isDialogOpen={isDialogOpen}
                            setDialogData={setDialogData}
                            dialogData={dialogData}
                            ring={planet.ring}
                            ringRadius={planet.ringRadius}
                            ringColor={planet.ringColor}
                            ringTube={0.5*sizeScalingFactor}
                            planetMeshes={planetMeshes}
                            setPlanetMeshes={setPlanetMeshes}
                            controls={controls}
                            raycaster={raycaster}
                            dir={dir}
                        />
                    ))}

                    {/*Asteroid Belt */}
                    {Array.from({ length: asteroidCount }, (_, i) => {
                        const angle = angleIncrement * i;
                        const x = semiMajorAxis * Math.cos(angle);
                        const y = semiMinorAxis * Math.sin(angle);
                        const randomness = asteroidOffsets.current[i]; // getting a random value between -50 and 50
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
                    </Suspense>
            </Canvas>
        </div>
    )
}

export default SolarSystem;