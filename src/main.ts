import "./style.css";
import pythonLogo from "./python-logo.svg";
import GameLoop from "./game-loop";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>SnekGame</h1>
    <img src="${pythonLogo}" class="logo vanilla" alt="Snek logo" />
  </div>
  <div id="game-board"></div>
`;

const gameLoop: GameLoop = new GameLoop();
gameLoop.runGame();