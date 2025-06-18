import './DragArea.css'
import Droppable from '../../src/components/Droppable'

export default function DragArea1({
  children,
  dropAreaId,
}: {
  dropAreaId: string
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
    <Droppable
      dropId={dropAreaId}
      droppableTypes={['goal2']}
      onDrop={dropHandler}
    >
      {children}
    </Droppable>
  )
}
