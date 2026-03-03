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
