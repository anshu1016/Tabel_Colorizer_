import "./styles.module.css";
import { useState } from "react";

export default function App() {
  const defaultColor = "white";

  const [state, setState] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill({ value: null, color: defaultColor }))
  );

  const [inputNumber, setInputNumber] = useState("");
  const [cellvalue, setCellValue] = useState("");
  const handleInput = (e) => {
    const number = Number(e.target.value);
    setInputNumber(number);
  };

  const handleGet = () => {
    if (inputNumber && inputNumber > 0 && inputNumber < 6) {
      setState(
        Array(inputNumber)
          .fill()
          .map(() =>
            Array(inputNumber).fill({ value: null, color: defaultColor })
          )
      );
      setInputNumber("");
    } else {
      setInputNumber("");
      alert("Enter a number between 1 and 5 only");
    }
  };

  const handleCell = (rowIndex, colIndex) => {
    const newColor = "red";
    const updatedState = [...state];
    updatedState[rowIndex][colIndex] = {
      ...updatedState[rowIndex][colIndex],
      color: newColor
    };
    setState(updatedState);
  };

  const handleReset = () => {
    setState(
      Array(3)
        .fill()
        .map(() => Array(3).fill({ value: null, color: defaultColor }))
    );
    setCellValue("");
  };
  const HoldTheCell = (e) => {
    const number = Number(e.target.value);
    setCellValue(number);
  };
  const handleInputCellColor = () => {
    if (cellvalue) {
      const rowIndex = Math.floor((cellvalue - 1) / state.length);
      const colIndex = (cellvalue - 1) % state.length;

      // Check if rowIndex and colIndex are valid
      if (state[rowIndex] && state[rowIndex][colIndex]) {
        const newColor = "red"; // or any color you desire
        const updatedState = [...state];
        updatedState[rowIndex][colIndex] = {
          ...updatedState[rowIndex][colIndex],
          color: newColor
        };
        setState(updatedState);
        setCellValue("");
      } else {
        alert("Enter valid number..");
        setCellValue("");
      }
    }
  };

  return (
    <div className="App">
      <h1>Table Colorizer</h1>
      <h4>Get the size of table</h4>

      <input
        type="number"
        min={1}
        max={5}
        placeholder="Enter no. of Rows"
        onChange={handleInput}
        value={inputNumber}
      />
      <button onClick={handleGet}>GET</button>
      <h2>Enter the cell Number you want to Color</h2>
      <input
        type="number"
        placeholder="Enter the cell you want to color:"
        onChange={HoldTheCell}
        value={cellvalue}
      />
      <button onClick={handleInputCellColor}>Color The Cell</button>
      <table border="1">
        {state.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                onClick={() => handleCell(rowIndex, colIndex)}
                style={{ backgroundColor: cell.color }}
              >
                {rowIndex * state.length + colIndex + 1}
              </td>
            ))}
          </tr>
        ))}
      </table>

      <button onClick={handleReset}>RESET</button>
    </div>
  );
}
