import {
  sortNodesByDistanceDesc,
  updateUnvisitedNeighbors,
  getNodesInShortestPathOrder,
} from "./helper";

// Performs Dijkstra's algorithm; returns nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export default function dijkstra(grid, start, finish) {
  const startNode = grid[start[0]][start[1]];
  const finishNode = grid[finish[0]][finish[1]];
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  let count = 1;
  const unvisitedNodes = grid.flat();
  while (unvisitedNodes.length) {
    sortNodesByDistanceDesc(unvisitedNodes);
    const closestNode = unvisitedNodes.pop();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall && startNode !== closestNode) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return false;
    closestNode.visitedOrder = count;
    count++;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      let shortestPathNodes = getNodesInShortestPathOrder(finishNode);
      shortestPathNodes.forEach((n, i) => (n.pathOrder = i + 1));
      return true;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
  return false;
}
