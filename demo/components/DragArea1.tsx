import './DragArea.css'
import Droppable from '../../src/components/Droppable'

export default function DragArea1({
  children,
  dropId,
}: {
  dropId: string
  children?: React.ReactNode
}) {
  function dropHandler(
    canBeDropped: boolean,
    dragElementRef: any,
    dropContainerRef: any
  ) {
    if (canBeDropped && dragElementRef && dropContainerRef) {
      dropContainerRef.appendChild(dragElementRef)
    }
  }

  return (
    <Droppable dropId={dropId} droppableTypes={['goal']} onDrop={dropHandler}>
      {children}
    </Droppable>
  )
}
