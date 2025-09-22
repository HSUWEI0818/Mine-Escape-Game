import { useMineGame } from "../lib/stores/useMineGame";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function GameOverlay() {
  const { gameState, restartGame } = useMineGame();

  if (gameState.status === 'playing') return null;

  const isWin = gameState.status === 'won';
  const isLevelComplete = gameState.status === 'level_complete';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">
            {isWin && "🎉"}
            {isLevelComplete && "🎯"}
            {gameState.status === 'lost' && "💥"}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">
            {isWin && "Congratulations!"}
            {isLevelComplete && "Level Complete!"}
            {gameState.status === 'lost' && "Game Over!"}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {isWin && "You've successfully completed all 3 levels! Well done!"}
            {isLevelComplete && `Great job! You've completed level ${gameState.currentLevel - 1}. Ready for the next challenge?`}
            {gameState.status === 'lost' && `You hit a bomb on level ${gameState.currentLevel}. Better luck next time!`}
          </p>
          
          <div className="space-y-3">
            {isLevelComplete && (
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full"
                size="lg"
              >
                Continue to Level {gameState.currentLevel}
              </Button>
            )}
            
            <Button 
              onClick={restartGame} 
              variant={isLevelComplete ? "outline" : "default"}
              className="w-full"
              size="lg"
            >
              {isLevelComplete ? "Restart Game" : "Play Again"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
