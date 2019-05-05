import * as React from "react";
import { Group, Wedge, Text } from "react-konva";
import Konva from "konva";

interface WheelProps {
  numberList: number[];
  numOfWedges: number;
  slowingDown: boolean;
  coordinates: { x: number; y: number };
  onStop: () => void;
}
const colors = ["grey", "red", "green", "blue", "purple", "black"];

export const Wheel = (props: WheelProps) => {
  const wheel = React.useRef<Konva.Group>(null);
  const [animation, setAnimation] = React.useState<Konva.Animation>();

  React.useEffect(() => {
    let anim: Konva.Animation;
    let angularVelocity = 190;
    let stopped = false;
    const angularFriction = 0.02;
    let slowdown = false;
    let active = false;
    if (wheel.current) {
      anim = new Konva.Animation((frames: any) => {
        if (!active) {
          setTimeout(() => {
            slowdown = true;
            console.log("timedout");
          }, Math.random() * 10000);
          active = true;
        }
        if (slowdown) {
          let slowingDownChange =
            (angularVelocity * frames.timeDiff * (1 - angularFriction)) / 1000;
          angularVelocity -= slowingDownChange;
        }
        let angleDiff = (frames.timeDiff * angularVelocity) / 1000;
        if (angleDiff <= 0.01 && !stopped) {
          console.log("less than 0");
          stopped = true;
          props.onStop();
        } else if (!stopped) {
          wheel.current!.rotate(angleDiff);
        }
      }, wheel.current!.getLayer());
      if (anim.isRunning()) console.log("xxx");
      setAnimation(anim);
    }
  }, []);

  const onClick = () => {
    animation!.start();
  };
  return (
    <Group
      ref={wheel}
      x={props.coordinates.x}
      onClick={onClick}
      y={props.coordinates.y}
    >
      {props.numberList.map((e, i) => (
        <Group key={e} rotation={360 - (360 / props.numOfWedges) * e}>
          <Wedge
            key={e}
            radius={200}
            id="test"
            fill={colors[Math.floor(Math.random() * colors.length)]}
            angle={360 / props.numOfWedges}
          />
          <Text
            Text="test"
            ontFamily={"Calibri}"}
            fontSize={30}
            fill={"white"}
            align={"center"}
            stroke={"black"}
            strokeWidth={1}
            x={120}
            y={120}
            rotation={150}
            listening={false}
          />
        </Group>
      ))}
    </Group>
  );
};
