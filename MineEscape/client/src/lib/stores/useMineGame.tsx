import { create } from "zustand";
import { generateGrid, Cell } from "../gameLogic";

export type GameStatus = 'playing' | 'won' | 'lost' | 'level_complete';

interface GameState {
  currentLevel: number;
  gridSize: number;
  clicksRemaining: number;
  grid: Cell[][] | null;
  status: GameStatus;
}

interface MineGameState {
  gameState: GameState;
  
  // Actions
  initializeGame: () => void;
  clickCell: (row: number, col: number) => void;
  restartGame: () => void;
  nextLevel: () => void;
}

export const useMineGame = create<MineGameState>((set, get) => ({
  gameState: {
    currentLevel: 1,
    gridSize: 5,
    clicksRemaining: 3,
    grid: null,
    status: 'playing'
  },
  
  initializeGame: () => {
    const gridSize = 5; // Level 1 starts with 5x5
    const numBombs = 5; // Level 1 has 5 bombs
    
    set({
      gameState: {
        currentLevel: 1,
        gridSize,
        clicksRemaining: 3,
        grid: generateGrid(gridSize, numBombs),
        status: 'playing'
      }
    });
  },
  
  clickCell: (row: number, col: number) => {
    const state = get();
    
    if (!state.gameState.grid || state.gameState.status !== 'playing') return;
    
    const newGrid = state.gameState.grid.map(gridRow => [...gridRow]);
    const cell = newGrid[row][col];
    
    if (cell.isClicked) return;
    
    cell.isClicked = true;
    
    if (cell.isBomb) {
      // Game over - hit a bomb
      set({
        gameState: {
          ...state.gameState,
          grid: newGrid,
          status: 'lost'
        }
      });
      return;
    }
    
    const newClicksRemaining = state.gameState.clicksRemaining - 1;
    
    if (newClicksRemaining === 0) {
      // Level complete
      if (state.gameState.currentLevel === 3) {
        // Won the entire game
        set({
          gameState: {
            ...state.gameState,
            grid: newGrid,
            clicksRemaining: 0,
            status: 'won'
          }
        });
      } else {
        // Complete current level, move to next
        set({
          gameState: {
            ...state.gameState,
            grid: newGrid,
            clicksRemaining: 0,
            status: 'level_complete'
          }
        });
        
        // Auto-advance to next level after a short delay
        setTimeout(() => {
          get().nextLevel();
        }, 2000);
      }
    } else {
      set({
        gameState: {
          ...state.gameState,
          grid: newGrid,
          clicksRemaining: newClicksRemaining
        }
      });
    }
  },
  
  nextLevel: () => {
    const state = get();
    const newLevel = state.gameState.currentLevel + 1;
    const newGridSize = 6 - newLevel; // Level 2: 4x4, Level 3: 3x3
    const numBombs = newGridSize; // Same number of bombs as grid size
    
    set({
      gameState: {
        currentLevel: newLevel,
        gridSize: newGridSize,
        clicksRemaining: 3,
        grid: generateGrid(newGridSize, numBombs),
        status: 'playing'
      }
    });
  },
  
  restartGame: () => {
    get().initializeGame();
  }
}));
