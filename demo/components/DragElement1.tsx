import { Draggable } from '../../src/components'

export default function DragElement1({ dragId, children, ...props }: any) {
  return (
    <Draggable dragId={dragId} dragType="goal" {...props}>
      {children}
    </Draggable>
  )
}
