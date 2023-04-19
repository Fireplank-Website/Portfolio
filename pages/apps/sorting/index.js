import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import Node from "../../../components/Sorting/Node";
import { BsChevronDown, BsFillSquareFill, BsQuestionCircle } from "react-icons/bs";
import { useRef, useState } from "react";
import Modal from "../../../components/Modal";
import Head from "next/head";

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export default function Visualizer() {
    const [speed, setSpeed] = useState(10);
    const [algo, setAlgo] = useState(0);
    const [list, setList] = useState(shuffle(Array.from(Array(150).keys(), (x) => x + 1)));
    // const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedNode, setSelectedNode] = useState([]);
    const [finished, setFinished] = useState([]);
    const stop = useRef(false);
    // const [hasReset, setHasReset] = useState(true);
    const toast = useToast();

    const shuffleList = () => {
        if (isRunning) {
            stop.current = true;
            setIsRunning(false);
            toast({
                title: "Sorting stopped",
                status: "info",
                position: "bottom-right",                
                isClosable: true,
            });
            return;
        }
        // shuffle the list
        shuffle(list);
        // reset the selected and finished nodes
        setSelectedNode([]);
        setFinished([]);
        // force rerender
        setList([...list]);
    }
    
    const visualizeBubbleSort = async () => {
        while (true) {
            const changed = false;
            for (let i = 0; i < list.length; i++) {
                if (stop.current) {
                    stop.current = false;
                    return;
                }
                if (list[i] > list[i + 1]) {
                    changed = true;
                    const temp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = temp;
                    setSelectedNode([i, i + 1]);
                    if (speed < 0) {
                        await new Promise(r => setTimeout(r, 20 * -(speed)));
                    } else if (speed != 69) {
                        if (speed == 10) {
                            await new Promise((resolve) => setTimeout(resolve, 3/speed));
                        } else if (i % 2 == 0) {
                            await new Promise((resolve) => setTimeout(resolve, 3/speed));
                        }
                    } else {
                        if (i % 6 == 0) {
                            await new Promise((resolve) => setTimeout(resolve, 0.001));
                        }
                    }
                }
            }
            if (!changed) {
                // remove the last selected node
                setSelectedNode([]);
                for (let i = 0; i < list.length; i++) {
                    finished.push(i);
                    // force rerender
                    setFinished([...finished]);
                    await new Promise((resolve) => setTimeout(resolve, 1.25));
                }
                setIsRunning(false);
                // toaster message
                toast({
                    title: "Sorting Finished!",
                    status: "success",
                    position: "bottom-right",
                    isClosable: true,
                });
                break;
            }
        }
    }

    const visualizeInsertionSort = async () => {
        for (let i = 1; i < list.length; i++) {
            let j = i - 1;
            let temp = list[i];
            while (j >= 0 && list[j] > temp) {
                if (stop.current) {
                    stop.current = false;
                    return;
                }
                list[j + 1] = list[j];
                j--;
                setSelectedNode([j + 1, j + 2]);
                if (speed < 0) {
                    await new Promise(r => setTimeout(r, 20 * -(speed)));
                } else if (speed != 69) {
                    if (speed == 10) {
                        await new Promise((resolve) => setTimeout(resolve, 3/speed));
                    } else if (i % 2 == 0) {
                        await new Promise((resolve) => setTimeout(resolve, 3/speed));
                    }
                } else {
                    if (i % 6 == 0) {
                        await new Promise((resolve) => setTimeout(resolve, 0.001));
                    }
                }
            }
            list[j + 1] = temp;
            setSelectedNode([]);
        }
        for (let i = 0; i < list.length; i++) {
            finished.push(i);
            // force rerender
            setFinished([...finished]);
            await new Promise((resolve) => setTimeout(resolve, 1.25));
        }
        setIsRunning(false);
        // toaster message
        toast({
            title: "Sorting Finished!",
            status: "success",
            position: "bottom-right",
            isClosable: true,
        });
    }

    const visualizeQuickSort = async () => {
        const partition = async (low, high) => {
            let pivot = list[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (stop.current) {
                    return;
                }
                if (list[j] < pivot) {
                    i++;
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                    setSelectedNode([i, j, high]);
                    if (speed < 0) {
                        await new Promise(r => setTimeout(r, 20 * -(speed)));
                    } else if (speed != 69) {
                        if (speed == 10) {
                            await new Promise((resolve) => setTimeout(resolve, 3/speed));
                        } else if (i % 2 == 0) {
                            await new Promise((resolve) => setTimeout(resolve, 3/speed));
                        }
                    } else {
                        if (i % 6 == 0) {
                            await new Promise((resolve) => setTimeout(resolve, 0.001));
                        }
                    }
                }
            }
            let temp = list[i + 1];
            list[i + 1] = list[high];
            list[high] = temp;
            setSelectedNode([i + 1, high]);
            if (speed < 0) {
                await new Promise(r => setTimeout(r, 20 * -(speed)));
            } else if (speed != 69) {
                if (speed == 10) {
                    await new Promise((resolve) => setTimeout(resolve, 3/speed));
                } else if (i % 2 == 0) {
                    await new Promise((resolve) => setTimeout(resolve, 3/speed));
                }
            } else {
                if (i % 5 == 0) {
                    await new Promise((resolve) => setTimeout(resolve, 0.001));
                }
            }
            return i + 1;
        }
        const quickSort = async (low, high) => {
            if (low < high) {
                let pi = await partition(low, high);
                await quickSort(low, pi - 1);
                await quickSort(pi + 1, high);
            }
        }
        await quickSort(0, list.length - 1);
        if (stop.current) {
            stop.current = false;
            return;
        }
        setSelectedNode([]);
        for (let i = 0; i < list.length; i++) {
            finished.push(i);
            // force rerender
            setFinished([...finished]);
            await new Promise((resolve) => setTimeout(resolve, 1.25));
        }
        setIsRunning(false);
        // toaster message
        toast({
            title: "Sorting Finished!",
            status: "success",
            position: "bottom-right",
            isClosable: true,
        });
    }

    const visualizeMergeSort = async () => {
        // Initialize itmd array with 0 for each index
        let itmd = new Array(list.length).fill(0);

        function mergeArray(start, end) {
            let mid = parseInt((start + end) >> 1);
            let start1 = start, start2 = mid + 1
            let end1 = mid, end2 = end
             
            // Initial index of merged subarray
            let index = start
         
            while (start1 <= end1 && start2 <= end2) {
                if (list[start1] <= list[start2]) {
                    itmd[index] = list[start1]
                    index = index + 1
                    start1 = start1 + 1;
                }
                else if(list[start1] > list[start2]) {
                    itmd[index] = list[start2]
                    index = index + 1
                    start2 = start2 + 1;
                }
            }
         
            // Copy the remaining elements of
            // arr[], if there are any
            while (start1 <= end1) {
                itmd[index] = list[start1]
                index = index + 1
                start1 = start1 + 1;
            }
         
            while (start2 <= end2) {
                itmd[index] = list[start2]
                index = index + 1
                start2 = start2 + 1;
            }
         
            index = start
            while (index <= end) {
                list[index] = itmd[index];
                index++;
            }
        }
        const i = 1;
        const mergeSort = async (start, end) => {
            i++;
            if (start < end) {
                let mid = parseInt((start + end) >> 1)
                await mergeSort(start, mid)
                await mergeSort(mid + 1, end)
                await mergeArray(start, end)
                // force rerender
                setList([...list]);
                // set selected nodes to be all numbers between start and end
                setSelectedNode([...Array(end - start + 1).keys()].map(x => x + start));
         
                if (speed < 0) {
                    await new Promise(r => setTimeout(r, 25 * -(speed)));
                } else if (speed != 69) {
                    if (speed == 10) {
                        await new Promise((resolve) => setTimeout(resolve, 3/speed));
                    } else if (i % 2 == 0) {
                        await new Promise((resolve) => setTimeout(resolve, 3/speed));
                    }
                } else {
                    if (i % 4 == 0) {
                        await new Promise((resolve) => setTimeout(resolve, 0.001));
                    }
                }
            }
        }
        await mergeSort(0, list.length - 1);
        setSelectedNode([]);
        for (let i = 0; i < list.length; i++) {
            finished.push(i);
            // force rerender
            setFinished([...finished]);
            await new Promise((resolve) => setTimeout(resolve, 1.25));
        }
        setIsRunning(false);
        // toaster message
        toast({
            title: "Sorting Finished!",
            status: "success",
            position: "bottom-right",
            isClosable: true,
        });   
    }

    const isSorted = () => {
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i] > list[i + 1]) {
                return false;
            }
        }
        return true;
    }

    const visualizeBogoSort = async () => {
        while (!isSorted(list)) {
            if (stop.current) {
                stop.current = false;
                return;
            }
            shuffle(list);
            // force rerender
            setList([...list]);
            // set selected node to random node
            setSelectedNode([Math.floor(Math.random() * list.length)]);
            if (speed < 0) {
                await new Promise(r => setTimeout(r, 20 * -(speed)));
            } else {
                await new Promise((resolve) => setTimeout(resolve, 0.001));
            }
        }
        setSelectedNode([]);
        for (let i = 0; i < list.length; i++) {
            finished.push(i);
            // force rerender
            setFinished([...finished]);
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
        setIsRunning(false);
        // toaster message
        toast({
            title: "Sorting Finished!",
            status: "success",
            position: "bottom-right",
            isClosable: true,
        });
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
        setIsRunning(true);

        switch (algo) {
            case 0:
                visualizeQuickSort();
                break;
            case 1:
                visualizeBubbleSort();
                break;
            case 2:
                visualizeInsertionSort();
                break;
            case 3:
                visualizeBogoSort();
                break;
            case 4:
                visualizeMergeSort();
        }
    }

    const getSpeed = () => {
        switch (speed) {
            case 69:
                return "Unlimited";
            case 15:
                return "Very Fast";
            case 10:
                return "Fast";
            case -10:
                return "Normal";
            case -15:
                return "Slow";
        }
    }
    const getAlgorithm = () => {
        if (algo != 3 && list.length == 5) {
            setList(shuffle(Array.from(Array(150).keys(), (x) => x + 1)));
            setFinished([]);
        }
        switch (algo) {
            case 0:
                return "Quick Sort";
            case 1:
                return "Bubble Sort";
            case 2:
                return "Insertion Sort";
            case 3:
                if (list.length > 5) {
                    setFinished([]);
                    setList(shuffle(Array.from(Array(5).keys(), (x) => x + 1)));
                }
                return "Bogosort";
            case 4:
                return "Merge Sort";
        }
    }

    return (
        <Box>
            <Head>
                <title>Sorting Visualizer - FirePlank</title>
                <meta property="og:url" content="https://fireplank.xyz/apps/sorting" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sorting Visualizer" />
                <meta name="description" content="A sorting visualizer showing the inner working of different sorting algorithms" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="portfolio, fireplank, tech, technology" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box padding="2rem 0 0 3rem">
                <Button margin={"1rem"} onClick={() => visualize()}>Visualize</Button>
                <Menu>
                    <MenuButton as={Button} margin={"1rem 1rem 1rem 0"} rightIcon={<BsChevronDown />}>
                        Algo: {getAlgorithm()}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setAlgo(0)}>Quick Sort</MenuItem>
                        <MenuItem onClick={() => setAlgo(4)}>Merge Sort</MenuItem>
                        <MenuItem onClick={() => setAlgo(1)}>Bubble Sort</MenuItem>
                        <MenuItem onClick={() => setAlgo(2)}>Insertion Sort</MenuItem>
                        <MenuItem onClick={() => setAlgo(3)}>Bogosort</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} marginRight={"1rem"} rightIcon={<BsChevronDown />}>
                        Speed: {getSpeed()}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setSpeed(69)}>Unlimited</MenuItem>
                        <MenuItem onClick={() => setSpeed(15)}>Very Fast</MenuItem>
                        <MenuItem onClick={() => setSpeed(10)}>Fast</MenuItem>
                        <MenuItem onClick={() => setSpeed(-10)}>Normal</MenuItem>
                        <MenuItem onClick={() => setSpeed(-15)}>Slow</MenuItem>
                    </MenuList>
                </Menu>
                <Button marginRight={"1rem"} onClick={shuffleList} bgColor="red.400" _hover={{ bg: "red.500" }}>{isRunning ? "Stop Sort" : "Shuffle List"}</Button>
                <Modal
                    title="How to use" 
                    icon={<BsQuestionCircle/>} 
                    body={`The usage of this app is simple. Just select the wanted sorting algorithm and speed in which to display the updates to the list. You can shuffle the list to your liking and then press 'Visualize' and let the program do it's magic.

All in all the list contains 150 differently sized poles (is that what I should call them?) that then get nietly sorted into an ascending order with the sorting algorithm of your choice.
The bogosort algorithm sorts only 5 poles however due to the sheer slowness of the algorithm.`}/>
            </Box>
            <Box padding="10rem 1rem 0 0" paddingLeft={{ base: '1rem', lg: '3rem' }}>
                { /* Visualize the list in a form of polls */ }
                <HStack spacing="1px" alignItems={"end"}>
                    {list.map((value, idx) => {
                        return (
                            <Node
                                key={idx}
                                value={value}
                                selected={selectedNode.includes(idx)}
                                finished={finished.includes(idx)}
                                algo={algo}
                            />
                        );
                    })}
                </HStack>
            </Box>
        </Box>
    )

}