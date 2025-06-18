import './DragArea.css'
import DropContainer from '../../src/components/DropContainer'

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
    <DropContainer
      dropId={dropId}
      droppableTypes={['goal']}
      onDrop={dropHandler}
    >
      {children}
    </DropContainer>
  )
}
