import "./style.css";
import GameLoop from "./game-loop";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */ `
  <div id="game-board"></div>
  <div id="info_board">
    <div id="snake_emoji">
      🐍
    </div>
    <div id="game_info">
      <div>
        <h1>Score:</h1>
        <h1 id="score">-<h1>
      </div>
      <div>
        <h1 id="message"><h1>
      </div>
      <div>
        <h1 id="interval"></h1>
      </div>
      <div>
        <h1 id="controls">Movement Options:<h1>
        <h1 id="controls">WASD, Arrow Keys<h1>
      </div>
    </div>
    <div id="game_buttons">
      <button id="start_button">Start Game</button>
      <button id="reset_button">Reset Game</button>
      <button id="credit_button">Source Code ↗️</button>
    </div>
  </div>
`;

const gameLoop: GameLoop = new GameLoop();

document.getElementById("start_button")?.addEventListener("click", () => {
  gameLoop.runGame();
});
document.getElementById("reset_button")?.addEventListener("click", () => {
  gameLoop.resetGame();
});
document.getElementById("credit_button")?.addEventListener("click", () => {
  window.open("https://github.com/SudyStefan/Snek");
});
