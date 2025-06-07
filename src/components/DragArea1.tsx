import { useRef } from 'react'
import { useDragContainer } from '../providers/DragAndDrop'

import './DragArea.css'

export default function DragArea1({
  children,
  dragAreaId,
}: {
  dragAreaId: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const droppableContainer = {
    id: dragAreaId,
    droppableTypes: ['goal'],
    ref: ref.current,
  }

  const {
    canBeDropped,
    readyToDrop,
    dragEnterHandler,
    dragOverHandler,
    dropHandler,
    dragLeaveHandler,
  } = useDragContainer(droppableContainer)

  return (
    <div
      ref={ref}
      className={`dropzone${canBeDropped ? ' highlight' : ''}${readyToDrop ? ' ready' : ''}`}
      onDragEnter={dragEnterHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      {children}
    </div>
  )
}
