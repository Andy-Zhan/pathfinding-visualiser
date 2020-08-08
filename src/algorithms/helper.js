export function sortNodesByDistanceDesc(nodes) {
  nodes.sort((nodeA, nodeB) => nodeB.distance - nodeA.distance);
}

export function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
  return unvisitedNeighbors;
}

export function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}

export function getUnvisitedNeighbors(node, grid) {
  return getNeighbors(node, grid).filter(
    (neighbor) => !(neighbor.visitedOrder || neighbor.isWall)
  );
}

// Backtracks from the finishNode to find the shortest path.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
