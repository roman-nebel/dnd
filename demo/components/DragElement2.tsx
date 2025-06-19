import { Draggable } from '../../src/components'

export default function DragElement2({ dragId, children, ...props }: any) {
  return (
    <Draggable dragId={dragId} dragType="goal2" {...props}>
      {children}
    </Draggable>
  )
}
