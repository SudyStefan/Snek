import GameBoard from "./game-board";
import { CharacterMap, type GameUpdate } from "./types";
import Renderer from "./renderer";

export default class GameLoop {
  private gameBoard: GameBoard;
  private renderer: Renderer;
  private running: boolean = false;
  private resetPending: boolean = false;
  private height: number;
  private width: number;
  private lastValidInput: KeyboardEvent | null = null;
  private latestUpdate: GameUpdate;

  private renderBoard = (): void => {
    this.renderer.renderChanges(this.latestUpdate.changeObjects);
  };

  private renderSidebar = (): void => {
    const scoreItem = document.getElementById("score") as HTMLHeadingElement
    scoreItem.textContent = this.latestUpdate.score.toString();
  }

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
  };

  private performReset() {
    this.running = false;
    this.resetPending = false;
    this.renderer.clear();

    this.gameBoard = new GameBoard(this.height, this.width);
    this.renderer.initializeBoard(this.gameBoard.getBoard(), this.height, this.width);

    this.latestUpdate = {
      isGameOver: false,
      changeObjects: [],
      score: 0
    };
    this.lastValidInput = null;
  }

  constructor(height: number = 10, width: number = 10) {
    this.height = height;
    this.width = width;
    
    this.gameBoard = new GameBoard(this.height, this.width);
    this.renderer = new Renderer(this.gameBoard.getBoard(), this.height, this.width);

    this.latestUpdate = {
      isGameOver: false,
      changeObjects: [],
      score: 0
    };

    window.addEventListener("keydown", (e) => this.listenToInput(e));
  }

  public runGame = () => {
    this.running = true;
    const messageItem = document.getElementById("message") as HTMLHeadingElement
    messageItem.textContent = "Game running!"

    const gameInterval = setInterval(() => {
      if (this.resetPending) {
        this.performReset();
      }
      this.update();
      this.renderBoard();
      this.renderSidebar();
      if (!this.running) {
        messageItem.textContent = "Game Over!"
        clearInterval(gameInterval); // Kill the loop
      }
    }, 500); //ms
  };

  public resetGame = () => {
    this.resetPending = true;
  }
}
