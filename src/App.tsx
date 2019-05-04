import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Stage, Layer, Rect, Text, Wedge, Group } from "react-konva";
import { Animation } from "konva/types/Animation";
import Konva from "konva";
import { Wheel } from "./Wheel";

const App: React.FC = () => {
  const [number, setNumber] = React.useState([] as number[]);

  const [slowingDown, setSlowingDown] = React.useState(false);

  const numOfWedges = 3;
  const layer = React.useRef<Konva.Layer>(null);

  React.useEffect(() => {
    let temp = [];
    for (let i = 1; i <= numOfWedges; i++) {
      temp.push(i);
    }
    setNumber(temp);
  }, []);

  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layer}>
          <Wheel
            numOfWedges={numOfWedges}
            numberList={number}
            slowingDown={slowingDown}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
