import * as React from "react";
import { Frame, Stack, addPropertyControls, ControlType } from "framer";
import { url } from "framer/resource";
import { Task } from "./Task";
import { Timer } from "./Timer";
import styled, { css } from "styled-components";
import { heightPerMin } from "./shared/consts";
import tasks2 from "./tasks/tasks2.js";

const Wrap = styled.div`
  /* background: rgba(217, 255, 0, 0.4); */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Indicator = styled.div`
  background: hsl(8, 100%, 64%);
  position: absolute;
  height: 14px;
  line-height: 14px;
  transform: translateY(-50%);
  color: white;
  ${props =>
    props.index &&
    css`
      top: ${props.index * 30 * heightPerMin}px;
    `}
`;

const minutesToTime = minutes => {
  var hour, min;
  hour = parseInt(minutes / 60);
  min = minutes % 60;
  return {
    hour: hour,
    min: min,
  };
};
const timeToMinutes = (hour, min) => {
  return hour * 60 + min;
};

const TimeIndicators = ({ startHour, startMin, timeAmount, ...props }) => {
  var startMinutes = timeToMinutes(startHour, startMin);
  console.log("startMinutes", startMinutes);

  var times = [];
  for (let i = 0; i <= timeAmount / 30; i++) times.push(startMinutes + i * 30);
  return (
    <Wrap>
      {times.map((time, index) => {
        return (
          <Indicator key={index} index={index}>
            {minutesToTime(time).hour} : {minutesToTime(time).min}
          </Indicator>
        );
      })}
    </Wrap>
  );
};
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

export function Tasks({
  showTimer,
  timeAmount,
  startHour,
  startMin,
  useUpload,
  tasksFile,
  tasksFileName,
  ...props
}) {
  const [tasks, setTasks] = React.useState([]);
  const [tasksTimeSum, setTasksTimeSum] = React.useState([]);
  React.useEffect(() => {
    readTextFile(
      decodeURIComponent(
        useUpload
          ? tasksFile
          : location.origin + "/assets/" + tasksFileName + ".json"
      ),
      text => {
        var data = JSON.parse(text);
        setTasks(data.tasks);
        var res = 0;
        for (let i = 0; i < data.tasks.length; i++) res += data.tasks[i].time;
        setTasksTimeSum(res);
      }
    );
  }, []);
  return (
    <Stack width="100%" height={timeAmount * heightPerMin} gap={0}>
      <Timer timeAmount={timeAmount} />
      <TimeIndicators
        startHour={startHour}
        startMin={startMin}
        timeAmount={timeAmount}
      />
      {console.log("tasksTimeSum", tasksTimeSum)}
      {tasks.map((task, id) => (
        <Task
          key={id}
          timeAmount={timeAmount}
          name={task.name}
          time={task.time}
        />
      ))}
      <Task
        timeAmount={timeAmount}
        name="BACKUP TIME"
        time={timeAmount - tasksTimeSum}
        opacity={0.5}
      />
    </Stack>
  );
}

Tasks.defaultProps = {
  width: 375,
  height: 900,
  showTimer: false,
  timeAmount: 180,
  tasksFile: url("/assets/tasks-mock.json"),
};

addPropertyControls(Tasks, {
  showTimer: {
    type: ControlType.Boolean,
    title: "Show Timer",
    defaultValue: false,
    enabledTitle: "On",
    disabledTitle: "Off",
  },
  timeAmount: {
    type: ControlType.Number,
    defaultValue: 180,
    min: 0,
    max: 3600,
    unit: "min",
    step: 5,
    displayStepper: true,
  },
  startHour: {
    type: ControlType.Number,
    defaultValue: 7,
    min: 0,
    max: 24,
    unit: "H",
    step: 1,
    displayStepper: true,
  },
  startMin: {
    type: ControlType.Number,
    defaultValue: 40,
    min: 0,
    max: 60,
    unit: "M",
    step: 5,
    displayStepper: true,
  },
  useUpload: {
    type: ControlType.Boolean,
    title: "Use Upload",
    enabledTitle: "Use",
    disabledTitle: "Nope",
  },
  tasksFile: {
    type: ControlType.File,
    allowedFileTypes: ["json"],
    hidden(props) {
      return props.useUpload === false;
    },
  },
  tasksFileName: {
    type: ControlType.String,
    hidden(props) {
      return props.useUpload === true;
    },
  },
});
