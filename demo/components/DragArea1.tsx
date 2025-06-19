import { Droppable } from '../../src/components'

export default function DragArea1({
  children,
  dropId,
  onDrop,
}: {
  dropId: string
  onDrop?: () => void
  children?: React.ReactNode
}) {
  function handleDrop() {
    if (onDrop) {
      onDrop()
    }
  }
  return (
    <Droppable dropId={dropId} handlers={{ onDrop: handleDrop, goal: {} }}>
      {children}
    </Droppable>
  )
}
