import type { KnightsTravelBoard } from "../App";
import { KNIGHT_MOVES_X, KNIGHT_MOVES_Y } from "../constants";

/**
 * Validates if a knight can move to the specified coordinates.
 * Checks for board boundaries and ensures the square hasn't been visited.
 * * @param x - The target row index.
 * @param y - The target column index.
 * @param board - The current 2D array representation of the chessboard.
 * @param n - The dimension of the board (NxN).
 * @returns {boolean} True if the move is valid, false otherwise.
 */
export const checkCanBePlaced = (
  x: number,
  y: number,
  board: KnightsTravelBoard,
  n: number,
) => {
  if (x > n - 1 || y < 0 || y > n - 1 || x < 0) {
    return false;
  }

  if (board[x][y]) {
    return false;
  }

  return true;
};

/**
 * Implements Warnsdorff's Rule to optimise the search path.
 * It calculates the number of onward moves available for each potential jump
 * and sorts them in ascending order (fewest onward moves first).
 * * @param x - The current row index of the knight.
 * @param y - The current column index of the knight.
 * @param board - The current state of the chessboard.
 * @param n - The dimension of the board (NxN).
 * @returns {Object} An object containing sorted arrays of potential X and Y moves.
 */
export const sortArraysForWarnsdorffsRule = (
  x: number,
  y: number,
  board: KnightsTravelBoard,
  n: number,
) => {
  const numberOfRoutesAtIndex = [];

  for (let i = 0; i < KNIGHT_MOVES_X.length; i++) {
    const nextX = x + KNIGHT_MOVES_X[i];
    const nextY = y + KNIGHT_MOVES_Y[i];

    let routes = 0;

    for (let y = 0; y < KNIGHT_MOVES_X.length; y++) {
      const nextNextX = nextX + KNIGHT_MOVES_X[y];
      const nextNextY = nextY + KNIGHT_MOVES_Y[y];

      if (!checkCanBePlaced(nextNextX, nextNextY, board, n)) continue;

      routes++;
    }

    numberOfRoutesAtIndex.push(routes);
  }

  // Map moves to their weights and sort ascending
  const combined = numberOfRoutesAtIndex.map((val, index) => {
    return {
      val1: val,
      val2: KNIGHT_MOVES_X[index],
      val3: KNIGHT_MOVES_Y[index],
    };
  });
  combined.sort((a, b) => a.val1 - b.val1);

  const sortedEachXMove = combined.map((item) => item.val2);
  const sortedEachYMove = combined.map((item) => item.val3);
  // const sortedRoutes = combined.map((item) => item.val1);

  return { sortedEachXMove, sortedEachYMove };
};

export const solveKnightsTravel = (
  x: number,
  y: number,
  board: KnightsTravelBoard,
  count: number,
  n: number,
) => {
  // If count is larger than BOARD_SIZE^2 it has reached the last square successfully
  // the programme is complete
  if (count > n * n) {
    return true;
  }

  if (!checkCanBePlaced(x, y, board, n)) return false;

  // As it passed the previous condition, the number
  // populates the square
  board[x][y] = count;

  count++;

  // Prioritise moves using Warnsdorff's rule
  const { sortedEachXMove, sortedEachYMove } = sortArraysForWarnsdorffsRule(
    x,
    y,
    board,
    n,
  );

  // Loop through each next move.
  // Calls self, creating branches and backtracking where necessary
  // Once it returns "true" i.e. count is equal to 25 (and the last square has been taken up)
  // it returns true
  for (let i = 0; i < sortedEachXMove.length; i++) {
    const nextX = x + sortedEachXMove[i];
    const nextY = y + sortedEachYMove[i];
    if (solveKnightsTravel(nextX, nextY, board, count, n)) return true;
  }

  // Backtrack to undo move if no subsequent path is valid
  board[x][y] = null;

  return false;
};
