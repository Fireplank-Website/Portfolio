import { Box, useColorModeValue } from '@chakra-ui/react';

const Node = ({ selected, value, finished, algo }) => {
    const color = useColorModeValue('gray.600', 'white');
    return (
        // make box height based on value
        <Box
            height={algo != 3 ? `${value*0.24}rem` : `${3*value}rem`}
            width={algo != 3 ? "10px" : "10rem"}
            backgroundColor={selected ? 'red' : finished ? 'green' : color}
        ></Box>
    )
}

export default Node;