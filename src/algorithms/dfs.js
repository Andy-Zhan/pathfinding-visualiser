import { getNeighbors } from "./helper";

// Performs Depth-first search; returns nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export default function dfs(grid, start, finish) {
  let count = 1;

  const startNode = grid[start[0]][start[1]];
  const finishNode = grid[finish[0]][finish[1]];
  const visitedNodesInOrder = [];

  function dfsRecursive(node, distance) {
    node.visitedOrder = count;
    node.distance = distance;
    visitedNodesInOrder.push(node);
    if (node === finishNode) {
      console.log("found");
      return true;
    }
    count++;
    distance = distance + 0.05;
    for (let n of getNeighbors(node, grid)) {
      if (n.visitedOrder || n.isWall) continue;
      if (dfsRecursive(n, distance)) return true;
    }
  }
  if (dfsRecursive(startNode, 0)) {
    visitedNodesInOrder.forEach((n, i) => (n.pathOrder = i + 1));
    return true;
  } else return false;
}
