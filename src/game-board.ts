import { type Point, type Direction, type PointType, type ChangeObject, type GameUpdate, CharacterMap } from "./types";

export default class GameBoard {
  private boardHeight: number;
  private boardWidth: number;
  private board: PointType[][] = [];
  private snekBody: Point[] = [];
  private snekHead: Point;
  private apple: Point;
  private direction: Direction = "EAST";
  private snekLength: number;

  private changeBoardPoint = (point: Point, newType: PointType): ChangeObject => {
    this.board[point.row][point.col] = newType;
    return { point, newType };
  };

  private generateNewApple = (): ChangeObject => {
    let newApple = {
      row: Math.round(this.boardHeight / 2),
      col: Math.round(this.boardWidth / 2)
    };

    while (this.board[newApple.row][newApple.col] !== "EMPTY") {
      newApple = {
        row: Math.floor(Math.random() * this.boardHeight),
        col: Math.floor(Math.random() * this.boardWidth)
      };
    }

    this.apple = newApple;
    return this.changeBoardPoint(newApple, "APPLE");
  };

  private isCollision = (): boolean => {
    return this.snekBody.some((body: Point) => body.row === this.snekHead.row && body.col === this.snekHead.col);
  };

  private moveSnek = (newDirection: Direction): GameUpdate => {
    const opposites: Record<Direction, Direction> = {
      NORTH: "SOUTH",
      SOUTH: "NORTH",
      EAST: "WEST",
      WEST: "EAST"
    };
    if (newDirection !== opposites[this.direction]) {
      this.direction = newDirection;
    }
    const changeObjects: ChangeObject[] = [];

    const newBody: Point = { row: this.snekHead.row, col: this.snekHead.col };
    changeObjects.push(this.changeBoardPoint(newBody, "BODY")); //old head > body
    this.snekBody.push(newBody);
    switch (this.direction) {
      case "NORTH":
        this.snekHead.row--;
        break;
      case "SOUTH":
        this.snekHead.row++;
        break;
      case "EAST":
        this.snekHead.col++;
        break;
      case "WEST":
        this.snekHead.col--;
        break;
    }

    changeObjects.push(this.changeBoardPoint(this.snekHead, "HEAD")); //empty/apple > new head

    if (this.snekHead.row === this.apple.row && this.snekHead.col === this.apple.col) {
      this.snekLength += 1;
      changeObjects.push(this.generateNewApple()); //empty > new apple
    } else {
      changeObjects.push(this.changeBoardPoint(this.snekBody.shift()!, "EMPTY")); //last body > empty
    }
    return {
      isGameOver: this.isCollision(),
      changeObjects: changeObjects,
      score: this.snekLength
    };
  };

  constructor(boardHeight: number = 10, boardWidth: number = 10, snekLength: number = 3) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.snekLength = snekLength;
    const centerRow = Math.round(this.boardHeight / 2);

    console.log("Initializing board...");
    for (let row = 0; row < this.boardHeight; row++) {
      this.board.push([]);
      for (let col = 0; col < this.boardWidth; col++) {
        this.board[row].push("EMPTY");
      }
    }

    console.log("Initializing snek...");
    for (let i = 0; i < this.snekLength - 1; i++) {
      this.snekBody.push({ row: centerRow, col: i });
      this.changeBoardPoint(this.snekBody[i], "BODY");
    }
    this.snekHead = { row: centerRow, col: this.snekLength - 1 };
    this.changeBoardPoint(this.snekHead, "HEAD");
    this.apple = this.generateNewApple().point;
  }

  public getBoard = (): PointType[][] => {
    return this.board;
  };

  public run = (event: KeyboardEvent | null): GameUpdate => {
    if (event) {
      const inputKey: string = event.key.toLowerCase();
      return this.moveSnek(CharacterMap[inputKey]);
    }
    return this.moveSnek(this.direction);
  };
}
