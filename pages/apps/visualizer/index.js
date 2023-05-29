import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import Node from "../../../components/Visualizer/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../../../algorithms/dijkstra";
import { astar } from "../../../algorithms/astar";
import { BsChevronDown, BsFillSquareFill, BsQuestionCircle } from "react-icons/bs";
import { FaChevronRight, FaWeightHanging } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import { useRef, useState } from "react";
import Modal from "../../../components/Modal";
import Head from "next/head";

const getNewGridWithWallToggled = (grid, row, col, toggle) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isFinish || node.isStart) return grid;
    const newNode = {
        ...node,
        isWall: toggle,
        isWeight: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getNewGridWithWeightToggled = (grid, row, col, toggle) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isFinish || node.isStart) return grid;
    const newNode = {
        ...node,
        isWeight: toggle,
        isWall: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === 10 && col === 15,
        isFinish: row === 10 && col === 35,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isWeight: false,
        closed: false,
        previousNode: null,
    };
};

export default function Visualizer() {
    const [startnode, setStartnode] = useState({ row: 10, col: 15 });
    const [finishnode, setFinishnode] = useState({ row: 10, col: 35 });
    const [speed, setSpeed] = useState(5);
    const [algo, setAlgo] = useState(0);
    const [grid, setGrid] = useState(getInitialGrid());
    const [node, setNode] = useState(0);
    const [leftClick, setLeftClick] = useState(true);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [hasReset, setHasReset] = useState(true);
    const stop = useRef(false);
    const toast = useToast();

    const handleMouseDown = (row, col, toggle) => {
        setLeftClick(toggle);

        switch(node) {
            case 0:
                if (grid[row][col].isFinish || grid[row][col].isStart) break;
                const newGrid = grid.slice();
                newGrid[row][col] = {
                    ...newGrid[row][col],
                    isStart: true,
                };
                newGrid[startnode.row][startnode.col] = {
                    ...newGrid[startnode.row][startnode.col],
                    isStart: false,
                };
                setStartnode({ row, col });
                setGrid(newGrid);
                break;
            case 1:
                if (grid[row][col].isFinish || grid[row][col].isStart) break;
                const newGrid2 = grid.slice();
                newGrid2[row][col] = {
                    ...newGrid2[row][col],
                    isFinish: true,
                };
                newGrid2[finishnode.row][finishnode.col] = {
                    ...newGrid2[finishnode.row][finishnode.col],
                    isFinish: false,
                };
                setFinishnode({ row, col });
                setGrid(newGrid2);
                break;
            case 2:
                setGrid(getNewGridWithWallToggled(grid, row, col, toggle));
                break;
            case 3:
                setGrid(getNewGridWithWeightToggled(grid, row, col, toggle));
                break;
        }
        if (!hasReset) {
            resetGrid();
            setHasReset(true);
            stop.current = true;
        } else {
            stop.current = false;
        }
        setMouseIsPressed(true);
    }
    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed || (node != 2 && node != 3)) return;
        if (node == 2) setGrid(getNewGridWithWallToggled(grid, row, col, leftClick));
        else setGrid(getNewGridWithWeightToggled(grid, row, col, leftClick));
    }
    const handleMouseUp = () => {
        setMouseIsPressed(false);
    }

    // const setWeight = (row, col) => {
    //     const newGrid = grid.slice();
    //     const node = newGrid[row][col];
    //     if (node.isFinish || node.isStart || node.isWall) return;
    //     const newNode = {
    //         ...node,
    //         weight: 15,
    //     };
    //     newGrid[row][col] = newNode;
    //     setGrid(newGrid);
    // }


    // dijkstra
    const visualizeDijkstra = () => {
        const startNode = grid[startnode.row][startnode.col];
        const finishNode = grid[finishnode.row][finishnode.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPath = getNodesInShortestPathOrder(finishNode);
        animate(visitedNodesInOrder, nodesInShortestPath);
    }
    
    const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        let mult = 1;
        if (algo == 1) mult = 2;
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (stop.current) return;
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
                }, speed * i * mult);
                return;
            }
            setTimeout(() => {
                if (stop.current) return;
                const node = visitedNodesInOrder[i];
                if (!node.isStart && !node.isFinish) {
                    document.getElementById(`node-${node.row}-${node.col}`).setAttribute("class", "node node-visited");
                }
            }, speed * i * mult);
        }
    }

    // A*
    const visualizeAStar = () => {
        const startNode = grid[startnode.row][startnode.col];
        const finishNode = grid[finishnode.row][finishnode.col];
        const nodesInShortestPath = astar(grid, startNode, finishNode);
        animate(nodesInShortestPath[0], nodesInShortestPath[1]);
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        if (nodesInShortestPathOrder.length === 1) {
            toast({
                title: "No legal path found",
                status: "error",
                position: "bottom-right",
                isClosable: true,
            });
            setIsRunning(false);
            return;
        }
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (stop.current) return;
            setTimeout(() => {
                if (stop.current) return;
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).setAttribute("class", 'node node-shortest-path');
            }, 30 * i);
        }
        setIsRunning(false);
        setHasReset(false);
      }

    const visualize = () => {
        if (isRunning) {
            toast({
                title: "Visualizer is already running",
                status: "error",
                position: "bottom-right",
                isClosable: true,
            });
            return;
        }
        stop.current = false;
        setIsRunning(true);

        const nodes = document.getElementsByClassName("node");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute("class", "node");
        }
        // set walls
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                if (grid[row][col].isWall) {
                    document.getElementById(`node-${row}-${col}`).setAttribute("class", 'node node-wall');
                }
            }
        }
        // set start and finish node
        nodes[startnode.col + (50 * startnode.row)].className = "node node-start";
        nodes[finishnode.col + (50 * finishnode.row)].className = "node node-finish";

        switch (algo) {
            case 0:
                visualizeDijkstra();
                break;
            case 1:
                visualizeAStar();
                break;
        }
    }

    const getSpeed = () => {
        switch (speed) {
            case 1:
                return "Very Fast";
            case 5:
                return "Fast";
            case 10:
                return "Normal";
            case 15:
                return "Slow";
        }
    }
    const getAlgorithm = () => {
        switch (algo) {
            case 0:
                return "Dijkstra";
            case 1:
                return "A*";
        }
    }
    const getNode = () => {
        switch(node) {
            case 0:
                return "Start";
            case 1:
                return "Finish";
            case 2:
                return "Wall";
            case 3:
                return "Weight";
        }
    }


    const resetGrid = () => {
        if (isRunning) {
            stop.current = true;
            setIsRunning(false);
            toast({
                title: "Visualizer stopped",
                status: "info",
                position: "bottom-right",
                isClosable: true,
            });
            return;
        }
        // reset all node classes
        const nodes = document.getElementsByClassName("node");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute("class", "node");
        }
        // reset grid
        setGrid(getInitialGrid());
        // set start and finish node
        nodes[15 + (50 * 10)].className = "node node-start";
        nodes[35 + (50 * 10)].className = "node node-finish";
        setStartnode({ row: 10, col: 15 });
        setFinishnode({ row: 10, col: 35 });
    }

    return (
        <Box>
            <Head>
                <title>Pathfinding Visualizer - FirePlank</title>
                <meta property="og:url" content="https://fireplank.xyz/apps/visualizer" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Apps" />
                <meta name="description" content="A pathfinding visualizer showing the inner working of different pathfinding algorithms" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="portfolio, fireplank, tech, technology" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box padding="2rem 0 0 3rem">
                <Button margin={"1rem"} onClick={() => visualize()}>Visualize</Button>
                <Menu>
                    <MenuButton as={Button} margin={"1rem 1rem 1rem 0"} rightIcon={<BsChevronDown />}>
                        Node: {getNode()}
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<FaChevronRight/>} onClick={() => setNode(0)}>Start</MenuItem>
                        <MenuItem icon={<SiTarget/>} onClick={() => setNode(1)}>Target</MenuItem>
                        <MenuItem icon={<BsFillSquareFill/>} onClick={() => setNode(2)}>Wall</MenuItem>
                        <MenuItem icon={<FaWeightHanging/>} onClick={() => setNode(3)}>Weight</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} margin={"1rem 1rem 1rem 0"} rightIcon={<BsChevronDown />}>
                        Algo: {getAlgorithm()}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setAlgo(0)}>Dijkstra</MenuItem>
                        <MenuItem onClick={() => setAlgo(1)}>A*</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} marginRight={"1rem"} rightIcon={<BsChevronDown />}>
                        Speed: {getSpeed()}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setSpeed(1)}>Very Fast</MenuItem>
                        <MenuItem onClick={() => setSpeed(5)}>Fast</MenuItem>
                        <MenuItem onClick={() => setSpeed(10)}>Normal</MenuItem>
                        <MenuItem onClick={() => setSpeed(15)}>Slow</MenuItem>
                    </MenuList>
                </Menu>
                <Button marginRight={"1rem"} onClick={resetGrid} bgColor="red.400" _hover={{ bg: "red.500" }}>{isRunning ? "Stop visualization" : "Reset Board"}</Button>
                <Modal
                    title="How to use" 
                    icon={<BsQuestionCircle/>} 
                    body={`The usage of this app is simple. Just set the start and finish node with the node dropdown menu and then click the wanted square.
                    
                    You can set walls that the algo cannot go through with the wall node. Just hold down your left mouse button and drag it across the squares you want to make walls. To remove a wall just do the same while holding down the right mouse button.

                    Weights are placed and removed the same way as walls. The difference is that weighted nodes can be traversed through but it takes three times as long to do so.
                    
                    After that just set the wanted algorithm and press the visualize button. The app will then visually show how the selected algorithm finds the shortest path to the target node.`}/>
            </Box>
            <Box padding="3rem 1rem 0 0" paddingLeft={{ base: '1rem', lg: '3rem' }}>
                {grid.map((row, rowIdx) => {
                    return (
                        <HStack key={rowIdx} spacing="0">
                            {row.map((node, nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall, isWeight} = node;
                                return (
                                    <Node
                                    key={nodeIdx}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    isWeight={isWeight}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row, col, toggle) => handleMouseDown(row, col, toggle)}
                                    onMouseEnter={(row, col, toggle) =>
                                        handleMouseEnter(row, col, toggle)
                                    }
                                    onMouseUp={() => handleMouseUp()}
                                    row={row}></Node>
                                );
                            })}
                        </HStack>
                    );
                })}
                {/* add a line at the end to close the last node column */}
                <br />
            </Box>
        </Box>
    )

}