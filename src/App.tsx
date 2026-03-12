import { useState } from "react";
import "./App.css";

type Square = null | number;
type KnightsTravelBoard = Square[][];

function App() {
  const n = 8;

  const createBoard: () => KnightsTravelBoard = () => {
    return Array.from({ length: n }, () => Array(n).fill(null));
  };

  const [boardState, setBoardState] = useState<KnightsTravelBoard>(createBoard);

  const checkCanBePlaced = (
    x: number,
    y: number,
    board: KnightsTravelBoard,
  ) => {
    // This function checks:
    // 1) that the coordinate is on the board
    // 2) that the coordinate has not already been passed through

    if (x > n - 1 || y < 0 || y > n - 1 || x < 0) {
      return false;
    }

    if (board[x][y]) {
      return false;
    }

    return true;
  };

  // arrays where each index represents a different move the knight
  // can take. The value at each index represents
  const eachXMove = [-1, 1, 2, 2, 1, -1, -2, -2];
  const eachYMove = [2, 2, 1, -1, -2, -2, -1, 1];

  const sortArraysForWarnsdorffsRule = (
    x: number,
    y: number,
    board: KnightsTravelBoard,
  ) => {
    // array where each index maps to index of above arrays
    // Each value represents the number of routes each coordinate
    // has available
    const numberOfRoutesAtIndex = [];

    // Loops through each next move
    // For each potential next move, loops through all the preceding
    // potential moves. Counts up all moves that it can make, and pushes
    // this value into the above array
    for (let i = 0; i < eachXMove.length; i++) {
      const nextX = x + eachXMove[i];
      const nextY = y + eachYMove[i];

      let routes = 0;

      for (let y = 0; y < eachXMove.length; y++) {
        const nextNextX = nextX + eachXMove[y];
        const nextNextY = nextY + eachYMove[y];

        if (!checkCanBePlaced(nextNextX, nextNextY, board)) continue;

        routes++;
      }

      numberOfRoutesAtIndex.push(routes);
    }

    // Combines each array and then sorts on number of routesn in ascending order
    const combined = numberOfRoutesAtIndex.map((val, index) => {
      return { val1: val, val2: eachXMove[index], val3: eachYMove[index] };
    });
    combined.sort((a, b) => a.val1 - b.val1);

    // Separated each coordinate array again
    // Now coordinates ascend in number of available routes
    const sortedEachXMove = combined.map((item) => item.val2);
    const sortedEachYMove = combined.map((item) => item.val3);
    // const sortedRoutes = combined.map((item) => item.val1);

    return { sortedEachXMove, sortedEachYMove };
  };

  const getNextCoordinate = (
    x: number,
    y: number,
    board: KnightsTravelBoard,
    count: number,
  ) => {
    // If count is larger than n^2 it has reached the last square successfully
    // the programme is complete
    if (count > n * n) {
      return true;
    }

    if (!checkCanBePlaced(x, y, board)) return false;

    // As it passed the previous condition, the number
    // populates the square
    board[x][y] = count;

    // increment count for next recursion
    count++;

    // To find the solution faster, always move the knight to the adjacent
    // unvisited square that has the fewest onward moves available.
    // This approach dramatically reduces the number of backtracks.
    // This gets sorts each potential move by number of routes available in ascending order.
    const { sortedEachXMove, sortedEachYMove } = sortArraysForWarnsdorffsRule(
      x,
      y,
      board,
    );

    // Loop through each next move.
    // Calls self, creating branches and backtracking where necessary
    // Once it returns "true" i.e. count is equal to 25 (and the last square has been taken up)
    // it returns true
    for (let i = 0; i < sortedEachXMove.length; i++) {
      const nextX = x + sortedEachXMove[i];
      const nextY = y + sortedEachYMove[i];
      if (getNextCoordinate(nextX, nextY, board, count)) return true;
    }

    // Make backtracking squares null
    board[x][y] = null;

    return false;
  };

  const start = () => {
    const newBoard = createBoard();

    if (getNextCoordinate(n - 1, 0, newBoard, 1)) setBoardState(newBoard);
    else alert("No solution found");
  };

  const isEven = (number: number) => {
    return number % 2 === 0;
  };

  return (
    <>
      <div>
        <h1>A Knights Tour</h1>
        <div style={{ marginBottom: "30px" }}>
          {boardState?.map((row, index) => {
            const whiteStart = isEven(index);

            return (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "row" }}
              >
                {row.map((square, i) => {
                  const isColumnEven = isEven(i);

                  const color = () => {
                    if (whiteStart) {
                      if (isColumnEven) return "white";
                      else return "grey";
                    } else if (isColumnEven) return "grey";
                    else return "white";
                  };

                  return (
                    <div
                      key={i}
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        width: "70px",
                        height: "70px",
                        backgroundColor: color(),
                        color: "black",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      <p>{square}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <button style={{ fontSize: "30px" }} onClick={start}>
          Start
        </button>
      </div>
    </>
  );
}

export default App;
