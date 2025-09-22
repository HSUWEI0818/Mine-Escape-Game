import { useMineGame } from "../lib/stores/useMineGame";
import { cn } from "../lib/utils";

export default function GameGrid() {
  const { gameState, clickCell } = useMineGame();
  
  if (!gameState.grid) return null;

  const gridSize = gameState.gridSize;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "grid gap-2 p-4 bg-gray-100 rounded-lg",
          gridSize === 5 && "grid-cols-5",
          gridSize === 4 && "grid-cols-4", 
          gridSize === 3 && "grid-cols-3"
        )}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`
        }}
      >
        {gameState.grid.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "w-12 h-12 border-2 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105",
                cell.isClicked && cell.isBomb && "bg-red-500 text-white border-red-600",
                cell.isClicked && !cell.isBomb && "bg-green-500 text-white border-green-600",
                !cell.isClicked && "bg-white border-gray-300 hover:bg-gray-50 active:scale-95"
              )}
              onClick={() => clickCell(rowIndex, colIndex)}
              disabled={cell.isClicked || gameState.status !== 'playing'}
            >
              {cell.isClicked && cell.isBomb && "💣"}
              {cell.isClicked && !cell.isBomb && "✓"}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
