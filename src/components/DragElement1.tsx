import { useRef } from 'react'
import { useDragElement } from '../providers/DragAndDrop'

export default function DragElement1({ dragSourceId, draggableId }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const { dragStartHandler } = useDragElement({
    id: draggableId,
    type: 'goal',
    ref: ref.current,
  })
  return (
    <p
      ref={ref}
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', 'someData')
        dragStartHandler({ id: dragSourceId })
      }}
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
