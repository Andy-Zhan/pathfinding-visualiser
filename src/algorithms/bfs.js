import {
  getNodesInShortestPathOrder,
  updateUnvisitedNeighbors,
} from "./helper";

// Performs Breadth-first search.

export default function bfs(grid, start, finish) {
  const startNode = grid[start[0]][start[1]];
  const finishNode = grid[finish[0]][finish[1]];

  startNode.distance = 0;
  let count = 1;
  startNode.visitedOrder = count;
  count++;
  const queue = [];
  queue.push(startNode);
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode === finishNode) {
      let shortestPathNodes = getNodesInShortestPathOrder(finishNode);
      shortestPathNodes.forEach((n, i) => (n.pathOrder = i + 1));
      return true;
    }
    for (let neighbor of updateUnvisitedNeighbors(currentNode, grid)) {
      neighbor.visitedOrder = count;
      count++;
      queue.push(neighbor);
    }
  }
  return false;
}
