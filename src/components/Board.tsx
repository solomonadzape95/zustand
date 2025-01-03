/* eslint-disable @typescript-eslint/no-explicit-any */
import { combine } from "zustand/middleware";
import { Square } from "./Square";
import { create } from "zustand";
// import { shallow } from "zustand/shallow";

const useGameStore = create(
  combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares: any) => {
        set((state): any => ({
          squares:
            typeof nextSquares === "function"
              ? nextSquares(state.squares)
              : nextSquares,
        }));
      },
      setXIsNext: (nextXIsNext: any) => {
        set((state): any => ({
          xIsNext:
            typeof nextXIsNext === "function"
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }));
      },
    };
  })
);
export const Board = (): any => {
  const XIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const squares = useGameStore((state) => state.squares);
  const setSquares = useGameStore((state) => state.setSquares);
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = XIsNext ? "X" : "O";
  const status = calculateStatus(winner, turns, player);
  function calculateWinner(squares: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  function calculateTurns(squares: (string | null)[]) {
    return squares.filter((s) => !s).length;
  }
  function calculateStatus(
    winner: string | null,
    turns: number,
    player: string
  ) {
    if (!winner && !turns) return "Draw";
    if (winner) return `Winner ${winner}`;
    return `Next Player : ${player}`;
  }
  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setSquares(nextSquares);
    setXIsNext(!XIsNext);
  }
  return (
    <>
      <div
        style={{
          marginBottom: "0.5rem",
        }}
      >
        {status}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridTemplateRows: "repeat(3,1fr)",
          width: " calc(3 * 5rem)",
          height: "calc(3*5rem)",
          border: "3px solid black",
        }}
      >
        {squares.map((square, i) => {
          return (
            <Square
              key={i}
              value={square}
              onSquareClick={() => {
                handleClick(i);
              }}
            />
          );
        })}
      </div>
    </>
  );
};
