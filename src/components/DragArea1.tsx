import { useRef } from 'react'
import { useDragAndDrop, useDragAndDropEvents } from '../providers/DragAndDrop'

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
  const { dragEnterHandler, dragLeaveHandler } = useDragAndDrop()

  const { canBeDropped, readyToDrop } = useDragAndDropEvents(droppableContainer)
  return (
    <div
      ref={ref}
      className={`dropzone${canBeDropped ? ' highlight' : ''}${readyToDrop ? ' ready' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        dragEnterHandler(droppableContainer)
      }}
      onDragLeave={(e) => {
        dragLeaveHandler()
      }}
    >
      {children}
    </div>
  )
}
