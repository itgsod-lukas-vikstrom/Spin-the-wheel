import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Stage, Layer, Rect, Text, Wedge, Group } from "react-konva";
import { Animation } from "konva/types/Animation";
import Konva from "konva";

const App: React.FC = () => {
  const [number, setNumber] = React.useState([] as number[]);
  const colors = ["grey", "red", "green", "blue", "purple", "black"];
  const numOfWedges = 15;
  const layer = React.useRef<Konva.Layer>(null);
  const wheel = React.useRef<Konva.Group>(null);

  React.useEffect(() => {
    layer.current!.add(wheel.current!);

    const anim = new Konva.Animation((frames: any) => {
      let angleDiff = (frames.timeDiff * 90) / 1000;
      wheel.current!.rotate(angleDiff);
      wheel.current!.moveDown();
    }, layer);
    let temp = [];
    for (let i = 1; i <= numOfWedges; i++) {
      temp.push(i);
    }
    setNumber(temp);

    anim.start();
  }, []);

  console.log(layer.current);
  number.map(e => console.log(360 - (360 / numOfWedges) * e));
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layer}>
          <Rect
            offset={{ x: 50, y: 50 }}
            x={200}
            y={200}
            width={100}
            height={100}
            radius={200}
            fill={colors[Math.floor(Math.random() * colors.length)]}
            angle={360 / numOfWedges}
          />
          <Group ref={wheel} x={window.innerWidth / 2} y={400}>
            {number.map((e, i) => (
              <Group
                onClick={() => wheel.current!.rotate(20)}
                key={e}
                rotation={360 - (360 / numOfWedges) * e}
              >
                <Wedge
                  radius={200}
                  fill={colors[Math.floor(Math.random() * colors.length)]}
                  angle={360 / numOfWedges}
                />
              </Group>
            ))}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
