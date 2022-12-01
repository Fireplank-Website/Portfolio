export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.totalDistance = 0;

    const unvisitedNodes = getAllNodes(grid);
    for (const node of unvisitedNodes) {
        if (node !== startNode) {
            node.totalDistance = Infinity;
        }
    }
    while (!!unvisitedNodes.length) {
        const closestNode = sortNodesByDistance(unvisitedNodes);
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return [visitedNodesInOrder, getNodesInShortestPathOrderAstar(finishNode, startNode)];
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return [visitedNodesInOrder, getNodesInShortestPathOrderAstar(finishNode, startNode)];
        updateUnvisitedNeighbors(closestNode, grid, finishNode, startNode);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        if (!currentClosest || currentClosest.totalDistance > unvisitedNodes[i].totalDistance) {
        currentClosest = unvisitedNodes[i];
        index = i;
        } else if (currentClosest.totalDistance === unvisitedNodes[i].totalDistance) {
        if (currentClosest.hDist > unvisitedNodes[i].hDist) {
            currentClosest = unvisitedNodes[i];
            index = i;
        }
        }
    }
    unvisitedNodes.splice(index, 1);
    return currentClosest;
}

function updateUnvisitedNeighbors(node, grid, finishNode, startNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if (!neighbor.hDist) neighbor.hDist = calculateDist(neighbor, finishNode);
        let amount = 1;
        if (neighbor.isWeight) amount = 3;
        let distanceToCompare = node.distance + amount;
        if (distanceToCompare < neighbor.distance) { 
            neighbor.distance = distanceToCompare;
            neighbor.totalDistance = neighbor.distance + neighbor.hDist;
            neighbor.previousNode = node;
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function calculateDist(node, endNode) {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}