import { MdBiotech } from 'react-icons/md';
import { RiContactsBookLine } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';
import { FaProjectDiagram } from 'react-icons/fa';

export const projects = [
    {
        title: "Pathfinding Visualizer",
        description: "A pathfinding visualizer that can find the shortest path from the start node to the finish.",
        image: "/images/pathfinding.png",
        tags: ["Next.js", "Visualization", "Data Structures & Algorithms"],
        source: "https://github.com/Fireplank-Website/Portfolio/tree/main/pages/apps/visualizer",
        visit: "/apps/visualizer",
        id: 0
    },
    {
        title: "Sorting Visualizer",
        description: "A sorting visualizer that visually sorts an list using various sorting algorithms and visualization techniques.",
        image: "/images/sorting.png",
        play: "/apps/sorting",
        tags: ["Next.js", "Visualization", "Data Structures & Algorithms"],
        source: "https://github.com/Fireplank-Website/Portfolio/tree/main/pages/apps/sorting",
        visit: "/apps/sorting",
        id: 1
    },
    {
        title: "Chess Bot",
        description: "A powerful chess bot that can beat most beginner to intermediate players.",
        image: "/images/chess.jpg",
        tags: ["Data Structures", "Algorithms", "Rust", "AI"],
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
        title: "Pathfinding Visualizer",
        description: "A pathfinding visualizer that can find the shortest path from the start node to the finish.",
        image: "/images/pathfinding.png",
        play: "/apps/visualizer",
        id: 0
    },
    {
        title: "Sorting Visualizer",
        description: "A sorting visualizer that visually sorts an list using various sorting algorithms and visualization techniques.",
        image: "/images/sorting.png",
        play: "/apps/sorting",
        id: 0
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