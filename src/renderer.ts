import { StyleMap, type ChangeObject, type Direction, type PointType, RotationMap } from "./types";

export default class Renderer {
  private boardElement: HTMLElement;
  private intervalElement: HTMLHeadingElement;
  private scoreElement: HTMLHeadingElement;

  constructor(board: PointType[][], height: number, width: number) {
    this.boardElement = document.getElementById("game-board")!;
    this.initializeBoard(board, height, width);

    this.intervalElement = document.getElementById("interval") as HTMLHeadingElement;
    this.scoreElement = document.getElementById("score") as HTMLHeadingElement;
    this.renderSidebar(3, 500);
  }

  public initializeBoard(board: PointType[][], height: number, width: number) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = document.createElement("div");
        cell.className = StyleMap[board[row][col]];
        cell.id = `cell-${row}-${col}`;
        this.boardElement.appendChild(cell);
      }
    }
  }

  public clear = (): void => {
    this.boardElement.innerHTML = "";
  };

  public renderChanges = (changes: ChangeObject[], facing: Direction): void => {
    changes.forEach((change) => {
      const cell = document.getElementById(`cell-${change.point.row}-${change.point.col}`);
      if (cell) {
        cell.className = StyleMap[change.newType];
        if (change.newType === "HEAD") {
          cell.style.setProperty("--angle", RotationMap[facing]);
        }
      }
    });
  };

  public renderSidebar = (score: number, interval: number): void => {
    this.scoreElement.textContent = (score - 3).toString();
    this.intervalElement.textContent = `Interval: ${interval.toString()}ms`;
  };

  public renderGameOver = (facing: Direction): void => {
    const headItem = document.getElementsByClassName(StyleMap["HEAD"])[0] as HTMLElement;
    if (headItem) {
      headItem.style.setProperty("--angle", RotationMap[facing]);
      headItem.style.setProperty("--eyes", "'x x'");
      headItem.style.backgroundColor = "#9e9e9e";
    }

    const bodyItems = Array.from(document.getElementsByClassName(StyleMap["BODY"])) as HTMLDivElement[];
    bodyItems.forEach((item) => (item.style.backgroundColor = "#9e9e9e"));
  };
}
