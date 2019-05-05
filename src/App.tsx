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
  const stage = React.useRef<any>(null);

  const numOfWedges = 6;
  const wheelCoordinates = { x: window.innerWidth / 2, y: 400 };
  const layer = React.useRef<Konva.Layer>(null);

  const onStop = () => {
    console.log("Stopped");
    if (stage.current)
      console.log(
        stage.current
          .getIntersection({
            x: wheelCoordinates.x,
            y: wheelCoordinates.y / 2 + 35
          })
          .id()
      );
  };

  React.useEffect(() => {
    let temp = [];
    for (let i = 1; i <= numOfWedges; i++) {
      temp.push(i);
    }
    setNumber(temp);
  }, []);

  return (
    <div className="App">
      <Stage width={window.innerWidth} ref={stage} height={window.innerHeight}>
        <Layer ref={layer}>
          <Wheel
            numOfWedges={numOfWedges}
            numberList={number}
            coordinates={wheelCoordinates}
            slowingDown={slowingDown}
            onStop={onStop}
          />
          <Wedge
            angle={50}
            rotation={245}
            radius={50}
            fill={"white"}
            stroke={"grey"}
            shadowEnabled={true}
            x={wheelCoordinates.x}
            y={wheelCoordinates.y / 2 + 30}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
