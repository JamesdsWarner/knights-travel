import { useState } from "react";
import "./App.css";
import { solveKnightsTravel } from "./utils/knightUtils";

export type Square = null | number;
export type KnightsTravelBoard = Square[][];
import { BOARD_SIZE } from "./constants";

function App() {
  const createBoard: () => KnightsTravelBoard = () => {
    return Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(null),
    );
  };

  const [boardState, setBoardState] = useState<KnightsTravelBoard>(createBoard);

  const start = () => {
    const newBoard = createBoard();

    if (solveKnightsTravel(BOARD_SIZE - 1, 0, newBoard, 1, BOARD_SIZE))
      setBoardState(newBoard);
    else alert("No solution found");
  };

  const isEven = (number: number) => {
    return number % 2 === 0;
  };

  return (
    <>
      <div>
        <h1>A Knights Travel</h1>
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
