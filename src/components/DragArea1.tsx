import { useRef } from 'react'
import { useDragAndDrop } from '../providers/DragAndDrop'

export default function DragArea1({
  children,
  dragAreaId,
}: {
  dragAreaId: string
  children?: React.ReactNode
}) {
  const { dragOverHandler, dragLeaveHandler } = useDragAndDrop()
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      className="dropzone"
      onDragOver={(e) => {
        e.preventDefault()
        e.currentTarget.style.backgroundColor = '#e0f7fa'
        dragOverHandler({
          id: dragAreaId,
          droppableTypes: ['goal2'],
          ref: ref.current,
        })
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
