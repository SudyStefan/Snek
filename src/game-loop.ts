import GameBoard from "./game-board";
import { CharacterMap, type GameUpdate } from "./types";
import Renderer from "./renderer";

export default class GameLoop {
  private gameBoard!: GameBoard;
  private renderer!: Renderer;
  private running!: boolean;
  private resetPending!: boolean;
  private height: number;
  private width: number;
  private interval!: number;
  private lastValidInput: KeyboardEvent | null = null;
  private latestUpdate!: GameUpdate;
  private messageItem = document.getElementById("message") as HTMLHeadingElement;

  private render = (): void => {
    this.renderer.renderChanges(this.latestUpdate.changeObjects, this.latestUpdate.facing);
    this.renderer.renderSidebar(this.latestUpdate.score, this.interval);
  };

  private update = (): void => {
    this.latestUpdate = this.gameBoard.run(this.lastValidInput);
    this.interval = Math.max(50, this.interval - 2);

    if (this.latestUpdate.isGameOver) {
      this.running = false;
    }
  };

  private listenToInput = (event: KeyboardEvent): void => {
    if (event.key.toLowerCase() in CharacterMap) {
      this.lastValidInput = event;
    }
  };

  private getInitialState = (): GameUpdate => {
    return {
      isGameOver: false,
      changeObjects: [],
      facing: "EAST",
      score: 0
    };
  };

  private initialize = (): void => {
    this.running = true;
    this.resetPending = false;
    this.interval = 500;
    this.messageItem.textContent = "waiting for start...";

    this.gameBoard = new GameBoard(this.height, this.width);
    if (!this.renderer) {
      this.renderer = new Renderer(this.gameBoard.getBoard(), this.height, this.width);
    } else {
      this.renderer.clear();
      this.renderer.initializeBoard(this.gameBoard.getBoard(), this.height, this.width);
      this.renderer.renderSidebar(3, this.interval);
    }

    this.latestUpdate = this.getInitialState();
    this.lastValidInput = null;
  };

  constructor(height: number = 10, width: number = 10) {
    this.height = height;
    this.width = width;
    window.addEventListener("keydown", (e) => this.listenToInput(e));

    this.initialize();
  }

  // listens from main
  public runGame = () => {
    this.messageItem.textContent = "Game Running!";
    const tick = () => {
      this.update();
      if (!this.running) {
        this.messageItem.textContent = "Game Over!";
        this.renderer.renderGameOver(this.latestUpdate.facing);
        return;
      }
      if (this.resetPending) {
        this.initialize();
        return;
      }
      this.render();
      setTimeout(tick, this.interval);
    };
    setTimeout(tick, this.interval);
  };

  public resetGame = () => {
    if (!this.running) {
      this.initialize();
    } else {
      this.resetPending = true;
    }
  };
}
