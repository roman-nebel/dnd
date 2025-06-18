import './DragArea.css'
import Droppable from '../../src/components/Droppable'

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
    <Droppable dropId={dropId} handlers={{ onDrop: handleDrop, goal2: {} }}>
      {children}
    </Droppable>
  )
}
