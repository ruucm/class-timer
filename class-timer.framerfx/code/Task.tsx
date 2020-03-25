import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";

export function Task({ name, time, timeAmount, ...props }) {
  return (
    <Frame
      width="100%"
      height={(time / timeAmount) * 100 + "%"}
      background="hsl(218, 100%, 49%)"
      style={{
        borderBottom: "1px solid hsl(218, 100%, 30%)",
        color: "white",
        fontSize: 16,
      }}
      {...props}
    >
      {name} : in {time} min
    </Frame>
  );
}

Task.defaultProps = {
  name: "Task 1",
  time: 15,
  timeAmount: 180,
};

addPropertyControls(Task, {
  name: { type: ControlType.String, title: "Name" },
  time: {
    type: ControlType.Number,
    defaultValue: 15,
    min: 0,
    max: 60,
    unit: "min",
    step: 5,
    displayStepper: true,
  },
});
