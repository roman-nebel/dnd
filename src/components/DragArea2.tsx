import { useRef } from 'react'

import './DragArea.css'
import DragContainer from '../providers/DropContainer'
import { useDragAndDrop } from '../providers/DragAndDrop'

export default function DragArea1({
  children,
  dropAreaId,
}: {
  dropAreaId: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { draggableObject, target } = useDragAndDrop()

  function dropHandler(canBeDropped: boolean) {
    if (canBeDropped && draggableObject?.ref?.current && target?.ref?.current) {
      target.ref.current.appendChild(draggableObject.ref.current)
    }
  }

  return (
    <DragContainer
      ref={ref}
      dropAreaId={dropAreaId}
      droppableTypes={['goal2']}
      onDrop={dropHandler}
    >
      {children}
    </DragContainer>
  )
}
