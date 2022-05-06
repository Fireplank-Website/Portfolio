import { MdBiotech } from 'react-icons/md';
import { RiContactsBookLine } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';
import { FaProjectDiagram } from 'react-icons/fa';

export const projects = [
    {
        title: "Project One",
        description: "This is a template description for project one.",
        image: "/images/portfolio.jpg",
        tags: ["Next.js", "Chakra UI", "Tailwind CSS"],
        source: "https://example.com",
        visit: "https://example.com",
        id: 0
    },
    {
        title: "Project Two",
        description: "This is a template description for project two.",
        image: "/images/portfolio.jpg",
        tags: ["Next.js", "Chakra UI", "Algrorithms"],
        source: "https://example.com",
        visit: "https://example.com",
        id: 1
    },
    {
        title: "Project Three",
        description: "This is a template description for project three.",
        image: "/images/portfolio.jpg",
        tags: ["React", "Chakra UI", "Tailwind CSS"],
        source: "https://example.com",
        visit: "https://example.com",
        id: 2
    },
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