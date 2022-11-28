import { Box, useColorModeValue } from '@chakra-ui/react';

const Node = ({ selected, value, finished, algo }) => {
    const color = useColorModeValue('gray.600', 'white');
    const extraClassName = selected ? 'node-selected' : '';

    return (
        // make box height based on value
        <Box
            id={`snode-${value}`}
            className={`snode ${extraClassName}`}
            height={algo != 3 ? `${value*4}px` : `${3*value}rem`}
            width={algo != 3 ? "10px" : "10rem"}
            backgroundColor={selected ? 'red' : finished ? 'green' : color}
        ></Box>
    )
}

export default Node;