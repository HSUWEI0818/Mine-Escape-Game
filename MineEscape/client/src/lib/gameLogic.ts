export interface Cell {
  isBomb: boolean;
  isClicked: boolean;
}

export function generateGrid(size: number, numBombs: number): Cell[][] {
  // Create empty grid
  const grid: Cell[][] = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({
      isBomb: false,
      isClicked: false
    }))
  );
  
  // Place bombs randomly
  const totalCells = size * size;
  const bombPositions = new Set<number>();
  
  while (bombPositions.size < numBombs) {
    const position = Math.floor(Math.random() * totalCells);
    bombPositions.add(position);
  }
  
  // Convert positions to grid coordinates and place bombs
  bombPositions.forEach(position => {
    const row = Math.floor(position / size);
    const col = position % size;
    grid[row][col].isBomb = true;
  });
  
  return grid;
}

export function getAdjacentCells(grid: Cell[][], row: number, col: number): Cell[] {
  const adjacent: Cell[] = [];
  const size = grid.length;
  
  for (let r = Math.max(0, row - 1); r <= Math.min(size - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(size - 1, col + 1); c++) {
      if (r !== row || c !== col) {
        adjacent.push(grid[r][c]);
      }
    }
  }
  
  return adjacent;
}

export function countAdjacentBombs(grid: Cell[][], row: number, col: number): number {
  const adjacent = getAdjacentCells(grid, row, col);
  return adjacent.filter(cell => cell.isBomb).length;
}
