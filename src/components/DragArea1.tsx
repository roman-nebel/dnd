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
      onDragEnter={(e) => {
        e.preventDefault()
        dragEnterHandler()
      }}
      onDragOver={dragOverHandler}
      onDragLeave={(e) => {
        dragLeaveHandler()
      }}
      onDrop={(e) => {
        e.preventDefault()
        dropHandler()
      }}
    >
      {children}
    </div>
  )
}
