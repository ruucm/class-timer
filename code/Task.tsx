import * as React from 'react'
import { Frame, addPropertyControls, ControlType } from 'framer'

export function Task({ name, time, ...props }) {
  return (
    <Frame
      width="100%"
      height={(time / 180) * 100 + '%'}
      background="blue"
      style={{
        borderBottom: '1px solid black',
      }}
    >
      {name} : in {time} min
    </Frame>
  )
}

Task.defaultProps = {
  name: 'Task 1',
  time: 15,
}

addPropertyControls(Task, {
  name: { type: ControlType.String, title: 'Name' },
  time: {
    type: ControlType.Number,
    defaultValue: 15,
    min: 0,
    max: 60,
    unit: 'min',
    step: 5,
    displayStepper: true,
  },
})
