import { useRef } from 'react'
import { useDragAndDrop, useDragAndDropEvents } from '../providers/DragAndDrop'

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
    droppableTypes: ['goal2'],
    ref: ref.current,
  }
  const { dragOverHandler, dragLeaveHandler } = useDragAndDrop()

  const { canBeDropped, readyToDrop } = useDragAndDropEvents(droppableContainer)
  return (
    <div
      ref={ref}
      className={`dropzone ${canBeDropped ? 'highlight' : ''} ${readyToDrop ? 'ready' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        e.currentTarget.style.backgroundColor = '#e0f7fa'
        dragOverHandler(droppableContainer)
      }}
      onDragLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#fff'
        dragLeaveHandler()
      }}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        margin: '10px',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </div>
  )
}
