import { MdBiotech } from 'react-icons/md';
import { RiContactsBookLine } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';
import { FaProjectDiagram } from 'react-icons/fa';

export const projects = [
    {
        title: "3D Solar System Simulation",
        description: "A 3D solar system simulation built using Three.js. It includes planets, a sun, orbit paths, and features a user-controllable game speed, as well as a modal dialog displaying information on selected planets.",
        image: "/images/solar-system.png",
        tags: ["Three.js", "3D Graphics", "Physics Simulation"],
        source: "https://github.com/Fireplank-Website/Portfolio/tree/main/pages/apps/solar-system",
        visit: "/apps/solar-system",
        id: 0
    },
    {
        title: "Pathfinding & Sorting Visualizer",
        description: "A pathfinding & sorting visualizers that can find the shortest path from the start node to the finish and visually sort an list using various sorting algorithms and visualization techniques.",
        image: "/images/visualizer.jpg",
        tags: ["Next.js", "Visualization", "Data Structures & Algorithms"],
        source: "https://github.com/Fireplank-Website/Portfolio/tree/main/pages/apps",
        visit: "/apps",
        id: 1
    },
    {
        title: "Chess Bots",
        description: "Advanced and strong chess bots made using various programming languages and algorithms.",
        image: "/images/chess.jpg",
        tags: ["Data Structures & Algorithms", "Rust", "AI"],
        source: "https://github.com/FirePlank/HydroChess",
        visit: "",
        id: 2
    },
    {
        title: "UnoLife",
        description: "A desktop UI application with many classic games made fully in Rust.",
        image: "/images/UnoLife.png",
        tags: ["Rust", "Games", "UI"],
        source: "https://github.com/FirePlank/UnoLife",
        visit: "",
        id: 3
    },
];

export const apps = [
    {
        title: "3D Solar System Simulation",
        description: "A 3D solar system simulation built using Three.js. It includes planets, a sun, orbit paths, and features a user-controllable game speed, as well as a modal dialog displaying information on selected planets.",
        image: "/images/solar-system.png",
        play: "/apps/solar-system",
        id: 0
    },
    {
        title: "Pathfinding Visualizer",
        description: "A pathfinding visualizer that can find the shortest path from the start node to the finish.",
        image: "/images/pathfinding.png",
        play: "/apps/visualizer",
        id: 1
    },
    {
        title: "Sorting Visualizer",
        description: "A sorting visualizer that visually sorts an list using various sorting algorithms and visualization techniques.",
        image: "/images/sorting.png",
        play: "/apps/sorting",
        id: 2
    }
];

export const words = [
    '', // This line gets ignored in production mode and is necessary for the layout of the site to not snap when loading for the first time.
    'Full Stack Developer',
    'Software Engineer',
    'UI/UX Designer',
    'Open Source Contributor',
    'Cat Lover',
];

export const LinkItems = [
    { name: 'Projects', icon: FaProjectDiagram, path: '#projects' },
    { name: 'Technologies', icon: MdBiotech, path: '#tech' },
    { name: 'About', icon: BsInfoCircle, path: '#about' },
    { name: 'Contact', icon: RiContactsBookLine, path: '#contact' },
];

export const TimeLineData = [
    { year: 2019, text: 'Started my journey', },
    { year: 2020, text: 'Shared my projects with the world', },
    { year: 2021, text: 'Worked as a freelance developer', },
    { year: 2022, text: 'Participated in coding competitions and worked in teams', },
];


// The 3D Solar System simulation planet data
const scalingFactor = 500;
const sizeScalingFactor = 20;

// calculate random offset for planets
const offsets = [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
];

export const planets = [
    {
        name: "Mercury",
        distanceFromSun: "57.9 million km",
        orbitalPeriod: "88 days",
        rotationPeriod: "58 days",
        surfaceArea: "74 million km²",
        gravity: "3.7 m/s²",
        color: "#B8B8B8",
        size: 2*sizeScalingFactor,
        position: [1*scalingFactor, 0, 0],
        offset: offsets[0],
        xRadius: 1*scalingFactor,
        zRadius: 1*scalingFactor,
        speed: 47.87,
        texture: '/textures/mercury.jpg',
        ring: false
    },
    {
        name: "Venus",
        distanceFromSun: "108.2 million km",
        orbitalPeriod: "225 days",
        rotationPeriod: "243 days",
        surfaceArea: "460 million km²",
        gravity: "8.87 m/s²",
        color: "#E1DC59",
        size: 2.3*sizeScalingFactor,
        position: [1.42*scalingFactor, 0, 0],
        offset: offsets[1],
        xRadius: 1.42*scalingFactor,
        zRadius: 1.42*scalingFactor,
        speed: 35.02,
        texture: '/textures/venus.jpg',
        ring: true
    },
    {
        color: "#2E8B57",
        size: 2.5 * sizeScalingFactor,
        position: [1.8 * scalingFactor, 0, 0],
        offset: offsets[2],
        xRadius: 1.8 * scalingFactor,
        zRadius: 1.8 * scalingFactor,
        speed: 29.78,
        texture: '/textures/earth.jpg',
        name: "Earth",
        distanceFromSun: "149.6 million km",
        orbitalPeriod: "365 days",
        rotationPeriod: "1 day",
        surfaceArea: "510 million km²",
        gravity: "9.8 m/s²",
        ring: false
    },
    {
        color: "#B22222",
        size: 2.3 * sizeScalingFactor,
        position: [2.32 * scalingFactor, 0, 0],
        offset: offsets[3],
        xRadius: 2.32 * scalingFactor,
        zRadius: 2.32 * scalingFactor,
        speed: 24.077,
        texture: '/textures/mars.jpg',
        name: "Mars",
        distanceFromSun: "227.9 million km",
        orbitalPeriod: "687 days",
        rotationPeriod: "1.03 days",
        surfaceArea: "144 million km²",
        gravity: "3.7 m/s²",
        ring: false
    },
    {
        color: "#F1C40F",
        size: 7.5 * sizeScalingFactor,
        position: [5.2 * scalingFactor, 0, 0],
        offset: offsets[4],
        xRadius: 5.2 * scalingFactor,
        zRadius: 5.2 * scalingFactor,
        ring: true,
        ringRadius: 12 * sizeScalingFactor,
        ringTube: 0.5 * sizeScalingFactor,
        ringColor: '#F1C40F',
        speed: 13.07,
        texture: '/textures/jupiter.jpg',
        name: "Jupiter",
        distanceFromSun: "778.6 million km",
        orbitalPeriod: "12 years",
        rotationPeriod: "9.9 hours",
        surfaceArea: "6.1 billion km²",
        gravity: "24.79 m/s²",
        ring: true,
        ringRadius: 12 * sizeScalingFactor,
        ringColor: '#F1C40F'
    },
    {
        color: "#FFDAB9",
        size: 6.5 * sizeScalingFactor,
        position: [9.58 * scalingFactor, 0, 0],
        offset: offsets[5],
        xRadius: 9.58 * scalingFactor,
        zRadius: 9.58 * scalingFactor,
        speed: 9.69,
        texture: '/textures/saturn.jpg',
        name: "Saturn",
        distanceFromSun: "1.4 billion km",
        orbitalPeriod: "29 years",
        rotationPeriod: "10.7 hours",
        surfaceArea: "4.27 billion km²",
        gravity: "10.44 m/s²",
        ring: true,
        ringRadius: 10 * sizeScalingFactor,
        ringColor: '#F1C40F'
    },
    {
        color: "#00BFFF",
        size: 4.5 * sizeScalingFactor,
        position: [19 * scalingFactor, 0, 0],
        offset: offsets[6],
        xRadius: 19 * scalingFactor,
        zRadius: 19 * scalingFactor,
        speed: 6.81,
        texture: '/textures/uranus.jpg',
        name: "Uranus",
        distanceFromSun: "2.9 billion km",
        orbitalPeriod: "84 years",
        rotationPeriod: "17.2 hours",
        surfaceArea: "8.1 billion km²",
        gravity: "8.87 m/s²",
        ring: true,
        ringRadius: 10 * sizeScalingFactor,
        ringColor: '#00BFFF'
    },
    {
        color: "#F1C40F",
        size: 4.3 * sizeScalingFactor,
        position: [20.07 * scalingFactor, 0, 0],
        offset: offsets[7],
        xRadius: 20.07 * scalingFactor,
        zRadius: 20.07 * scalingFactor,
        speed: 5.43,
        texture: '/textures/neptune.jpg',
        name: "Neptune",
        distanceFromSun: "4.5 billion km",
        orbitalPeriod: "165 years",
        rotationPeriod: "16.1 hours",
        surfaceArea: "7.64 billion km²",
        gravity: "11.15 m/s²",
        ring: true,
        ringRadius: 10 * sizeScalingFactor,
        ringColor: '#F1C40F'
    }
];