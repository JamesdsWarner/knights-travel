import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // const createBoard = Array.from({ length: 8 }, (_, x) =>
  //   Array.from({ length: 8 }, (_, y) => String.fromCharCode(97 + y) + (8 - x)),
  // );

  const n = 5;

  const createBoard = Array.from({ length: n }, () => Array(n).fill(null));

  const [boardState, setBoardState] = useState();

  const [knight, setKnight] = useState<{ currentCoordinate: [number, number] }>(
    {
      currentCoordinate: [0, 0],
    },
  );

  const journey = useRef<[number, number][]>([[0, 0]]);

  const getNextCoordinate = (
    x: number,
    y: number,
    board: any,
    count: number,
  ) => {
    console.log("board: ", board);
    // const eachMove: [number, number][] = [
    //   [-1, 2],
    //   [1, 2],
    //   [2, 1],
    //   [2, -1],
    //   [1, -2],
    //   [-1, -2],
    //   [-2, -1],
    //   [-2, 1],
    // ];

    if (count > n * n) {
      return true;
    }

    if (x > n - 1 || y < 0 || y > n - 1 || x < 0) {
      // console.log("out of bounds");
      return false;
    }

    if (board[x][y]) {
      // console.log("been there");
      return false;
    }

    board[x][y] = count;

    // setBoard((prev) => {
    //   const boardCopy = [...prev];
    //   boardCopy[x][y] = true;
    //   return boardCopy;
    // });

    count++;

    const eachXMove = [-1, 1, 2, 2, 1, -1, -2, -2];
    const eachYMove = [2, 2, 1, -1, -2, -2, -1, 1];

    // eachMove.some(([mx, my]: [number, number]) => {
    //   const tempCoordinate: [number, number] = [currentX + mx, currentY + my];
    //   const tempX = tempCoordinate[0];
    //   const tempY = tempCoordinate[1];
    //   if (tempX > 7 || tempX < 0 || tempY > 7 || tempY < 0) {
    //     return;
    //   }

    //   coordinate = tempCoordinate;
    //   return true;
    // });

    for (let i = 0; i < eachXMove.length; i++) {
      const tempCoordinate: [number, number] = [
        x + eachXMove[i],
        y + eachYMove[i],
      ];
      const tempX = tempCoordinate[0];
      const tempY = tempCoordinate[1];
      console.log("tempCoordinate: ", tempCoordinate);

      getNextCoordinate(tempX, tempY, board, count);
    }

    board[x][y] = null;

    // setBoard((prev) => {
    //   const boardCopy = [...prev];
    //   boardCopy[x][y] = null;
    //   return boardCopy;
    // });

    return board;
  };

  const start = () => {
    const newBoard = getNextCoordinate(0, 0, createBoard, 1);

    console.log("newBoard: ", newBoard);

    setBoardState(newBoard);

    // if (nextCoordinate) {
    //   console.log("yes");
    //   setKnight({
    //     currentCoordinate: nextCoordinate,
    //   });
    //   journey.current.push(nextCoordinate);
    //   const newBoard = [...board];
    //   newBoard[nextCoordinate[0]][nextCoordinate[1]] = true;
    // }
  };

  return (
    <>
      <div>
        <button onClick={start}>CLICK</button>
        {boardState?.map((row, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            {row.map((square, i) => {
              // if (journey.current.includes(square)) {}
              return (
                <div
                  key={i}
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    width: "70px",
                    height: "70px",
                    backgroundColor: square ? "white" : "unset",
                    color: "black",
                  }}
                >
                  {square}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
