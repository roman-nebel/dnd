import { useRef } from 'react'
import { useDragAndDrop } from '../providers/DragAndDrop'

export default function DragElement1({ dragSourceId, draggableId }: any) {
  const { dragStartHandler, dragEndHandler } = useDragAndDrop()
  const ref = useRef<HTMLDivElement>(null)
  return (
    <p
      ref={ref}
      draggable={true}
      onDragStart={() =>
        dragStartHandler(
          { id: draggableId, ref: ref.current },
          { id: dragSourceId }
        )
      }
      onDragEnd={dragEndHandler}
      style={{
        cursor: 'grab',
        backgroundColor: '#f0f0f0',
        userSelect: 'none',
      }}
    >
      Drag me!
    </p>
  )
}
