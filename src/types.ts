export interface Point {
  row: number;
  col: number;
}

export interface ChangeObject {
  point: Point;
  newType: PointType;
}

export interface GameUpdate {
  isGameOver: boolean;
  changeObjects: ChangeObject[];
  facing: Direction;
  score: number;
}

export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export type PointType = "EMPTY" | "BODY" | "APPLE" | "HEAD";

export const CharacterMap: Record<string, Direction> = {
  arrowup: "NORTH",
  arrowdown: "SOUTH",
  arrowleft: "WEST",
  arrowright: "EAST",
  w: "NORTH",
  s: "SOUTH",
  a: "WEST",
  d: "EAST"
};

export const StyleMap: Record<PointType, string> = {
  EMPTY: "cell",
  BODY: "cell body",
  APPLE: "cell apple",
  HEAD: "cell head"
};

export const RotationMap: Record<Direction, string> = {
  NORTH: "0deg",
  EAST: "90deg",
  SOUTH: "180deg",
  WEST: "270deg"
};
