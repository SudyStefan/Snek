import { StyleMap, type ChangeObject, type PointType } from "./types";

export default class Renderer {
  private cells: HTMLElement[] = [];
  private boardElement: HTMLElement;

  constructor(board: PointType[][], height: number, width: number) {
    this.boardElement = document.getElementById("game-board")!;
    this.initializeBoard(board, height, width);
  }

  private initializeBoard(board: PointType[][], height: number, width: number) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = document.createElement("div");
        cell.className = StyleMap[board[row][col]];
        cell.id = `cell-${row}-${col}`;
        this.boardElement.appendChild(cell);
        this.cells.push(cell); // Store reference for quick access
      }
    }
  }

  public renderChanges(changes: ChangeObject[]) {
    changes.forEach((change) => {
      const cell = document.getElementById(`cell-${change.point.row}-${change.point.col}`);
      if (cell) {
        cell.className = StyleMap[change.newType];
      }
    });
  }
}
