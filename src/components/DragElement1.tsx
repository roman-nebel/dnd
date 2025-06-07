import { useRef } from 'react'
import DragElement from './DragElement'

export default function DragElement1({ dragSourceId, draggableId }: any) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <DragElement
      ref={ref}
      dragElementId={draggableId}
      type="goal"
      dragSourceId={dragSourceId}
    >
      Drag me!
    </DragElement>
  )
}
