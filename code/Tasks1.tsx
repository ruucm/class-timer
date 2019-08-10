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

export function Tasks1({
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
      <Task
        timeAmount={timeAmount}
        name="[🚩복습] - 지난시간 개념들 (JS 중점으로)"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩고블린(복습)] - Data, useAnimation"
        time={15}
      />
      <Task
        timeAmount={timeAmount}
        name="[🚩고블린(복습)] - TapHandlers"
        time={10}
      />
      <Task
        timeAmount={timeAmount}
        name="[🚩퀘스트 리뷰] - instagram-story"
        time={10}
      />
      <Task
        timeAmount={timeAmount}
        name="[🚩퀘스트 리뷰] - appstore-tap"
        time={15}
      />
      <Task
        timeAmount={timeAmount}
        name="[🚩개념] - Properties III"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - text-button"
        time={10}
      />

      <Task timeAmount={timeAmount} name="@@@ Break Time @@@" time={10} />

      <Task
        timeAmount={timeAmount}
        name="[🚩개념] - Javascript - Await"
        time={5}
      />

      <Task timeAmount={timeAmount} name="[🚩튜토리얼] - await" time={10} />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - ripple-effect"
        time={15}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩개념] - Javascript - 조건문"
        time={5}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - if-else-click"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - open-close"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩고블린] - if-else-move-box"
        time={10}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩고블린] - appstore-tap"
        time={15}
      />

      <Task
        timeAmount={timeAmount}
        name="[🚩튜토리얼] - open-close (conditional-operator)"
        time={10}
      />
    </Stack>
  )
}

Tasks1.defaultProps = {
  showTimer: false,
  timeAmount: 180,
}

addPropertyControls(Tasks1, {
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
