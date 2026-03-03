import "./style.css";
import pythonLogo from "/python-logo.svg";
import GameLoop from "./game-loop";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div id="game-board"></div>
  <div id="info-board">
    <div id="game-title">
      <h1>Snek</h1>
      <img src="${pythonLogo}" class="logo vanilla" alt="Snek logo" />
    </div>
    <div id="game-info">
      <div>
        <h1>Score:</h1>
        <h1 id="score">-<h1>
      </div>
      <div>
        <h2 id="message">Ready to play<h2>
      </div>
    </div>
    <div id="game-buttons">
      <button id="startButton">Start Game</button>
      <button id="resetButton">Reset Game</button>
    </div>
  </div>
`;

const gameLoop: GameLoop = new GameLoop();

const startButton = document.getElementById('startButton') as HTMLButtonElement;
const resetButton = document.getElementById('resetButton') as HTMLButtonElement;

const handleStart = (): void => {
  gameLoop.runGame();
};
const handleReset = (): void => {
  gameLoop.resetGame();
};
startButton.addEventListener('click', handleStart);
resetButton.addEventListener('click', handleReset);