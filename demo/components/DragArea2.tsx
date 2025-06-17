import './DragArea.css'
import DragContainer from '../../src/components/DropContainer'

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
    <DragContainer
      dropAreaId={dropAreaId}
      droppableTypes={['goal2']}
      onDrop={dropHandler}
    >
      {children}
    </DragContainer>
  )
}
