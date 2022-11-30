import { Box, useColorModeValue } from '@chakra-ui/react';
import { FaWeightHanging } from 'react-icons/fa';

const Node = ({ col,
    isFinish,
    isStart,
    isWall,
    isWeight,
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
    : isWeight
    ? 'node-weight'
    : '';

    return (
        isWeight ? (
            <FaWeightHanging
            color='black'
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={(event) => {
                event.preventDefault();
                onMouseDown(row, col, event.button === 0 ? true : false)
            }}
            onMouseEnter={() => onMouseEnter(row, col)}
            onContextMenu={(e)=> e.preventDefault()}
            onMouseUp={() => onMouseUp()}
            ></FaWeightHanging>
        ) : (
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
    )
}

export default Node;