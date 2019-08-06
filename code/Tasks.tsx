import * as React from 'react'
import { Frame, Stack, addPropertyControls, ControlType } from 'framer'
import { Task } from './Task'
import { Timer } from './Timer'

export function Tasks({ showTimer, timeAmount, ...props }) {
  return (
    <Stack width="100%" height={timeAmount * 5} gap={0} background="pink">
      <Timer timeAmount={timeAmount} />
      <Task name="킥오프" time={25} />
      <Task />
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
