import { describe, it, expect } from "vitest";
import { checkCanBePlaced, solveKnightsTravel } from "./knightUtils";

import type { KnightsTravelBoard } from "../App";

describe("Knight Logic", () => {
  const n = 5;
  const createEmptyBoard = (): KnightsTravelBoard =>
    Array.from({ length: n }, () => Array(n).fill(null));

  it("should identify out-of-bounds coordinates", () => {
    const board = createEmptyBoard();
    expect(checkCanBePlaced(-1, 0, board, n)).toBe(false);
    expect(checkCanBePlaced(5, 2, board, n)).toBe(false);
  });

  it("should identify already visited squares", () => {
    const board = createEmptyBoard();
    board[0][0] = 1;
    expect(checkCanBePlaced(0, 0, board, n)).toBe(false);
  });

  it("should solve a 5x5 board starting from (0,0)", () => {
    const board = createEmptyBoard();
    const result = solveKnightsTravel(0, 0, board, 1, n);

    expect(result).toBe(true);
    // Check if the last square (25) exists on the board
    const flattened = board.flat();
    expect(flattened).toContain(25);
    expect(flattened).not.toContain(null);
  });
});
