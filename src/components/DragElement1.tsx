import { useRef } from 'react'
import DragElement from '../providers/DragElement'

export default function DragElement1({ dragSourceId, draggableId }: any) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <DragElement
      ref={ref}
      dragElementId={draggableId}
      dragElementType="goal"
      dragSourceId={dragSourceId}
    >
      Drag me!
    </DragElement>
  )
}
