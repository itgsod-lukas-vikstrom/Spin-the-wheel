import * as React from "react";
import { Group, Wedge, Text } from "react-konva";
import Konva from "konva";

interface WheelProps {
  numberList: number[];
  numOfWedges: number;
  slowingDown: boolean;
}
const colors = ["grey", "red", "green", "blue", "purple", "black"];

export const Wheel = (props: WheelProps) => {
  const wheel = React.useRef<Konva.Group>(null);
  const [test, setTest] = React.useState(1);
  const [animation, setAnimation] = React.useState<Konva.Animation>();
  const animate = (frames: any): boolean => {
    return true;
  };
  React.useEffect(() => {
    let anim: Konva.Animation;
    let angularVelocity = 190;
    const angularFriction = 0.02;
    console.log("effect", props.slowingDown);
    let slowdown = false;
    if (wheel.current) {
      anim = new Konva.Animation((frames: any) => {
        if (slowdown) {
          let slowingDownChange =
            (angularVelocity * frames.timeDiff * (1 - angularFriction)) / 1000;
          angularVelocity -= slowingDownChange;
        }
        let angleDiff = (frames.timeDiff * angularVelocity) / 1000;
        wheel.current!.rotate(angleDiff);
      }, wheel.current!.getLayer());
      setTimeout(() => {
        slowdown = true;
        console.log("timedout");
      }, Math.random() * 10000);
      setAnimation(anim);
    }
  }, []);

  const onClick = () => {
    console.log("clicked");
    setTest(2);

    animation!.start();
  };
  return (
    <Group ref={wheel} x={window.innerWidth / 2} onClick={onClick} y={400}>
      {props.numberList.map((e, i) => (
        <Group rotation={360 - (360 / props.numOfWedges) * e}>
          <Wedge
            key={e}
            radius={200}
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
            listening={false}
          />
        </Group>
      ))}
    </Group>
  );
};
