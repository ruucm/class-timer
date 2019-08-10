import * as React from 'react'
import { Frame, Stack, addPropertyControls, ControlType } from 'framer'
import { Task } from './Task'
import { Timer } from './Timer'
import styled, { css } from 'styled-components'
import { heightPerMin } from './shared/consts'

const Wrap = styled.div`
  /* background: rgba(217, 255, 0, 0.4); */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const Indicator = styled.div`
  background: red;
  position: absolute;
  height: 14px;
  line-height: 14px;
  transform: translateY(-50%);
  ${props =>
    props.index &&
    css`
      top: ${props.index * 30 * heightPerMin}px;
    `}
`

const minutesToTime = minutes => {
  var hour, min
  hour = parseInt(minutes / 60)
  min = minutes % 60
  return {
    hour: hour,
    min: min,
  }
}
const timeToMinutes = (hour, min) => {
  return hour * 60 + min
}

const TimeIndicators = ({ startHour, startMin, timeAmount, ...props }) => {
  var startMinutes = timeToMinutes(startHour, startMin)
  console.log('startMinutes', startMinutes)

  var times = []
  for (let i = 0; i <= timeAmount / 30; i++) times.push(startMinutes + i * 30)

  console.log('times', times)

  return (
    <Wrap>
      {times.map((time, index) => {
        return (
          <Indicator key={index} index={index}>
            {minutesToTime(time).hour} : {minutesToTime(time).min}
          </Indicator>
        )
      })}
    </Wrap>
  )
}

export function Tasks2({
  showTimer,
  timeAmount,
  startHour,
  startMin,
  ...props
}) {
  return (
    <Stack
      width="100%"
      height={timeAmount * heightPerMin}
      gap={0}
      background="pink"
    >
      <Timer timeAmount={timeAmount} />
      <TimeIndicators
        startHour={startHour}
        startMin={startMin}
        timeAmount={timeAmount}
      />

      <Task timeAmount={timeAmount} name="[🚩고블린(복습)] - text" time={10} />
      <Task
        timeAmount={timeAmount}
        name="[🚩고블린(복습)] - if/else"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩퀘스트 리뷰] - audio-play-button"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - audio-play"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩퀘스트 리뷰] - instagram-like"
        time={20}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩개념] - Javascript 함수 / random() 함수"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - 🐝random-left"
        time={10}
      />
      <Task timeAmount={timeAmount} name="@@@ Break Time @@@" time={10} />

      <Task
        timeAmount={timeAmount}
        name="[🚩개념] - Javascript 변수 - Array, Object"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - 🐝random-left"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - 🐝array-random"
        time={15}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - array-layer-name"
        time={15}
      />

      <Task timeAmount={timeAmount} name="[🚩튜토리얼] - object" time={15} />
    </Stack>
  )
}

Tasks2.defaultProps = {
  showTimer: false,
  timeAmount: 180,
}

addPropertyControls(Tasks2, {
  showTimer: {
    type: ControlType.Boolean,
    title: 'Show Timer',
    defaultValue: false,
    enabledTitle: 'On',
    disabledTitle: 'Off',
  },
  timeAmount: {
    type: ControlType.Number,
    defaultValue: 180,
    min: 0,
    max: 3600,
    unit: 'min',
    step: 5,
    displayStepper: true,
  },
  startHour: {
    type: ControlType.Number,
    defaultValue: 7,
    min: 0,
    max: 24,
    unit: 'H',
    step: 1,
    displayStepper: true,
  },
  startMin: {
    type: ControlType.Number,
    defaultValue: 40,
    min: 0,
    max: 60,
    unit: 'M',
    step: 5,
    displayStepper: true,
  },
})
