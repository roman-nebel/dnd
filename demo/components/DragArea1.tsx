import './DragArea.css'
import Droppable from '../../src/components/Droppable'

export default function DragArea1({
  children,
  dropId,
  onDrop,
}: {
  dropId: string
  onDrop?: (
    canBeDropped: boolean,
    dragElementRef: any,
    dropContainerRef: any
  ) => void
  children?: React.ReactNode
}) {
  return (
    <Droppable dropId={dropId} droppableTypes={['goal']} onDrop={onDrop}>
      {children}
    </Droppable>
  )
}
