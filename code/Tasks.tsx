import * as React from 'react'
import { Frame, Stack, addPropertyControls, ControlType } from 'framer'
import { Task } from './Task'
import { Timer } from './Timer'

export function Tasks({ showTimer, timeAmount, ...props }) {
  return (
    <Stack width="100%" height={timeAmount * 5} gap={0} background="pink">
      <Timer timeAmount={timeAmount} />
      <Task timeAmount={timeAmount} name="킥오프" time={30} />
      <Task
        timeAmount={timeAmount}
        name="프로그램 및 Extension 설치"
        time={10}
      />
      <Task timeAmount={timeAmount} name="Framer 시작하기" time={10} />
      <Task timeAmount={timeAmount} name="Properties I" time={10} />
      <Task timeAmount={timeAmount} name="Override" time={10} />
      <Task timeAmount={timeAmount} name="start-override" time={10} />
      <Task timeAmount={timeAmount} name="Animation" time={10} />
      <Task timeAmount={timeAmount} name="width" time={10} />
      <Task timeAmount={timeAmount} name="background" time={10} />
      <Task timeAmount={timeAmount} name="height" time={10} />
      <Task timeAmount={timeAmount} name="top" time={10} />
      <Task timeAmount={timeAmount} name="scale-rotate-opacity" time={10} />
      <Task timeAmount={timeAmount} name="onTap" time={10} />
      <Task timeAmount={timeAmount} name="basic-card" time={10} />
      <Task timeAmount={timeAmount} name="overflow-top" time={10} />
      <Task timeAmount={timeAmount} name="text-color" time={10} />
    </Stack>
  )
}

Tasks.defaultProps = {
  showTimer: false,
  timeAmount: 180,
}

addPropertyControls(Tasks, {
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
})
