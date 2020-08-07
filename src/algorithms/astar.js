import { getNeighbors, getNodesInShortestPathOrder } from "./helper";

// Performs A* search.

export default function astar(grid, start, finish) {
  const open = [];
  const startNode = grid[start[0]][start[1]];
  const finishNode = grid[finish[0]][finish[1]];

  function getH(node) {
    return (
      Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
    );
  }

  open.push(startNode);
  startNode.distance = 0;
  let count = 1;

  while (open.length) {
    open.sort((nodeA, nodeB) => {
      const bh = getH(nodeB);
      const ba = getH(nodeA);
      const b = nodeB.distance + bh;
      const a = nodeA.distance + ba;
      return b - a || bh - ba;
    });

    const currentNode = open.pop();
    currentNode.visitedOrder = count;
    count++;

    if (currentNode === finishNode) {
      let shortestPathNodes = getNodesInShortestPathOrder(finishNode);
      shortestPathNodes.forEach((n, i) => (n.pathOrder = i + 1));
      return true;
    }

    for (let n of getNeighbors(currentNode, grid)) {
      if (n.isWall || !!n.visitedOrder) continue;
      const g = currentNode.distance + 1;
      if (g < n.distance) {
        n.distance = g;
        n.previousNode = currentNode;
      }
      if (!open.includes(n)) {
        open.push(n);
      }
    }
  }
  return false;
}
