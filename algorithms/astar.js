function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
    },

    pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
    }
    return result;
    },

    remove: function(node) {
    var length = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
        if (this.content[i] != node) continue;
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        // If the element we popped was the one we needed to remove,
        // we're done.
        if (i == length - 1) break;
        // Otherwise, we replace the removed element with the popped
        // one, and allow it to float up or sink down as appropriate.
        this.content[i] = end;
        this.bubbleUp(i);
        this.sinkDown(i);
        break;
    }
    },

    size: function() {
    return this.content.length;
    },

    bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n], score = this.scoreFunction(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
        parent = this.content[parentN];
        // If the parent has a lesser score, things are in order and we
        // are done.
        if (score >= this.scoreFunction(parent))
        break;

        // Otherwise, swap the parent with the current element and
        // continue.
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
    }
    },

    sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
    element = this.content[n],
    elemScore = this.scoreFunction(element);

    while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
        child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
        var child2 = this.content[child2N],
        child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
            swap = child2N;
        }

        // No need to swap further, we are done.
        if (swap == null) break;

        // Otherwise, swap and continue.
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
    }
    }
};

// A* search algorithm heuristic function.
function manhattan(pos0, pos1) {
    return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
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

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getCost(node, neighbor) {
    return neighbor.distance + manhattan(neighbor, node);
}

export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    var openHeap = new BinaryHeap(function(node) {
        return node.f;
    });

    startNode.h = manhattan(startNode, finishNode);
    openHeap.push(startNode);

    while (openHeap.size() > 0) {
        // Grab the lowest f(x) to process next. Heap keeps this sorted for us.
        var currentNode = openHeap.pop();

        // End case -- result has been found, return visited nodes in order.
        if (currentNode === finishNode) {
            return pathTo(currentNode);
        }

        // move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;

        // Find all neighbors for the current node.
        var neighbors = getUnvisitedNeighbors(currentNode, grid);
        // Loop through neighbors.
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            // Skip this neighbor if it has already been visited or it's a wall.
            if (neighbor.closed || neighbor.isWall) continue;

            // check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = currentNode.g + getCost(currentNode, neighbor);

            if (gScore < neighbor.g) {
                // Found a shorter path to this neighbor.
                neighbor.g = gScore;
                neighbor.h = neighbor.h || manhattan(neighbor, finishNode);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previousNode = currentNode;
                currentNode.isVisited = true;
                visitedNodesInOrder.push(currentNode);
                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    openHeap.push(neighbor);
                } else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
        updateUnvisitedNeighbors(currentNode, grid);
    }
    // No result was found.
    return visitedNodesInOrder;
}
function pathTo(node) {
    var curr = node;
    var path = [];
    while (curr.previousNode) {
      path.unshift(curr);
      curr = curr.previousNode;
    }
    return path;
  }

export function getAStarInShortestPath(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}