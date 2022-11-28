import { Box, useColorModeValue } from '@chakra-ui/react';

const Node = ({ col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row, }) => {

    const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

    return (
        <Box 
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={(event) => {
                event.preventDefault();
                onMouseDown(row, col, event.button === 0 ? true : false)
            }}
            onMouseEnter={() => onMouseEnter(row, col)}
            onContextMenu={(e)=> e.preventDefault()}
            onMouseUp={() => onMouseUp()}
        ></Box>
    )
}

export default Node;