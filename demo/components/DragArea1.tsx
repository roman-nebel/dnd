import { Droppable } from '../../src/components'

export default function DragArea1({
  children,
  dropId,
  onDragEnter,
  onDrop,
}: {
  dropId: string
  onDrop?: () => void
  onDragEnter?: () => void
  children?: React.ReactNode
}) {
  return (
    <Droppable dropId={dropId} handlers={{ onDrop, onDragEnter, goal: {} }}>
      {children}
    </Droppable>
  )
}
