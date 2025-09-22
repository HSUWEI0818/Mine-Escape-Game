import { useEffect } from "react";
import { useMineGame } from "../lib/stores/useMineGame";
import { useAudio } from "../lib/stores/useAudio";
import GameGrid from "./GameGrid";
import GameUI from "./GameUI";
import GameOverlay from "./GameOverlay";

export default function MineGame() {
  const { gameState, initializeGame } = useMineGame();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize audio
    const bgMusic = new Audio('/sounds/background.mp3');
    const hitSound = new Audio('/sounds/hit.mp3');
    const successSound = new Audio('/sounds/success.mp3');
    
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    setBackgroundMusic(bgMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);

    // Initialize the game
    initializeGame();
  }, [initializeGame, setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <GameUI />
        <div className="mt-6">
          <GameGrid />
        </div>
      </div>
      <GameOverlay />
    </div>
  );
}
