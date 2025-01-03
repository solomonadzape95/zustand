/* eslint-disable @typescript-eslint/no-explicit-any */

import { MouseEventHandler } from "react";
interface SquareProps {
  value: string;
  onSquareClick: MouseEventHandler<HTMLButtonElement>;
}
export const Square: React.FC<SquareProps> = ({
  value,
  onSquareClick,
}): any => {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "#fff",
        border: "2px solid black",
        outline: 0,
        color: "black",
        borderRadius: 0,
        fontSize: "1rem",
        fontWeight: "bold",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
