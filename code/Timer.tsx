import * as React from 'react'
import { Frame, addPropertyControls, ControlType } from 'framer'

const Bar = ({ timeAmount, ...props }) => {
  return (
    <Frame
      animate={{
        top: timeAmount * 5,
      }}
      transition={{
        duration: timeAmount * 60,
        ease: 'linear',
      }}
      width="100%"
      height={1}
      background="red"
    />
  )
}

export function Timer({ timeAmount, ...props }) {
  return (
    <Frame
      //   background="green"
      size="100%"
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 999,
      }}
    >
      <Bar timeAmount={timeAmount} />
    </Frame>
  )
}

Timer.defaultProps = {
  timeAmount: 180,
}

addPropertyControls(Timer, {
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
