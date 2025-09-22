import { useMineGame } from "../lib/stores/useMineGame";
import { useAudio } from "../lib/stores/useAudio";
import { Button } from "./ui/button";

export default function GameUI() {
  const { gameState, restartGame } = useMineGame();
  const { toggleMute, isMuted } = useAudio();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold text-gray-800">Mine Stepping Game</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMute}
          className="ml-4"
        >
          {isMuted ? "🔇" : "🔊"}
        </Button>
      </div>
      
      <div className="flex items-center space-x-8">
        <div className="text-center">
          <div className="text-sm text-gray-600">Level</div>
          <div className="text-2xl font-bold text-blue-600">{gameState.currentLevel}</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-600">Clicks Remaining</div>
          <div className="text-2xl font-bold text-orange-600">{gameState.clicksRemaining}</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-600">Grid Size</div>
          <div className="text-2xl font-bold text-purple-600">{gameState.gridSize}×{gameState.gridSize}</div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-600 mb-2">Instructions</div>
        <div className="text-xs text-gray-500 max-w-md">
          Click {gameState.clicksRemaining} safe grids to advance to the next level. 
          Avoid the {gameState.gridSize} hidden bombs!
        </div>
      </div>

      {gameState.status !== 'playing' && (
        <Button onClick={restartGame} className="mt-4">
          New Game
        </Button>
      )}
    </div>
  );
}
