import { StyleMap, type ChangeObject, type Direction, type PointType, RotationMap } from "./types";

export default class Renderer {
  private boardElement: HTMLElement;
  private intervalElement: HTMLHeadingElement;
  private scoreElement: HTMLHeadingElement;
  private cells: HTMLDivElement[][] = [];
  private headElement!: HTMLDivElement;

  constructor(board: PointType[][], height: number, width: number) {
    this.boardElement = document.getElementById("game-board")!;
    this.initializeBoard(board, height, width);

    this.intervalElement = document.getElementById("interval") as HTMLHeadingElement;
    this.scoreElement = document.getElementById("score") as HTMLHeadingElement;
    this.renderSidebar(3, 500);
  }

  public initializeBoard(board: PointType[][], height: number, width: number) {
    for (let row = 0; row < height; row++) {
      this.cells.push([]);
      for (let col = 0; col < width; col++) {
        const cell = document.createElement("div");
        cell.className = StyleMap[board[row][col]];
        cell.id = `cell-${row}-${col}`;

        this.cells[row].push(cell);
        this.boardElement.appendChild(cell);
        if (board[row][col] === "HEAD") {
          this.headElement = cell;
        }
      }
    }
  }

  public clear = (): void => {
    this.cells = [];
    this.boardElement.innerHTML = "";
  };

  public renderChanges = (changes: ChangeObject[], facing: Direction): void => {
    changes.forEach((change) => {
      const cellToChange = this.cells[change.point.row][change.point.col];
      if (cellToChange) {
        cellToChange.className = StyleMap[change.newType];
        if (change.newType === "HEAD") {
          cellToChange.style.setProperty("--angle", RotationMap[facing]);
          this.headElement = cellToChange;
        }
      }
    });
  };

  public renderSidebar = (score: number, interval: number): void => {
    this.scoreElement.textContent = (score - 3).toString();
    this.intervalElement.textContent = `Interval: ${interval.toString()}ms`;
  };

  public renderGameOver = (facing: Direction): void => {
    this.headElement.style.setProperty("--angle", RotationMap[facing]);
    this.headElement.style.setProperty("--eyes", "'x x'");
    this.headElement.style.backgroundColor = "#9e9e9e";

    const bodyItems = Array.from(document.getElementsByClassName(StyleMap["BODY"])) as HTMLDivElement[];
    bodyItems.forEach((item) => (item.style.backgroundColor = "#9e9e9e"));
  };
}
