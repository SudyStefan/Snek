import GameBoard from "./game-board";
import { CharacterMap, type GameUpdate } from "./types";
import Renderer from "./renderer";

export default class GameLoop {
  private gameBoard: GameBoard;
  private renderer: Renderer;
  private running: boolean = true;
  private lastValidInput: KeyboardEvent | null = null;
  private latestUpdate: GameUpdate;

  private render = (): void => {
    this.renderer.renderChanges(this.latestUpdate.changeObjects);
  };

  private listenToInput = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() in CharacterMap) {
      this.lastValidInput = event;
    }
  };

  private update = () => {
    this.latestUpdate = this.gameBoard.run(this.lastValidInput);

    if (this.latestUpdate.isGameOver) {
      this.running = false;
      console.log("Game stopped due to collision!");
    }

    console.log(this.latestUpdate);
  };

  constructor(height: number = 10, width: number = 10) {
    this.gameBoard = new GameBoard(height, width);
    this.renderer = new Renderer(this.gameBoard.getBoard(), height, width);

    this.latestUpdate = {
      isGameOver: false,
      changeObjects: [],
      score: 0
    };

    window.addEventListener("keydown", (e) => this.listenToInput(e));
  }

  public runGame = () =>  {
    console.log("Starting game");

    const gameInterval = setInterval(() => {
      this.update();
      this.render();
      if (!this.running) {
        clearInterval(gameInterval); // Kill the loop
        console.log("Game Over!");
      }
    }, 500); //ms
  };
}
