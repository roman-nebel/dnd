import { useRef } from 'react'
import DragElement from '../providers/DragElement'

export default function DragElement1({ dragElementId, dragSourceId }: any) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <DragElement
      ref={ref}
      dragElementId={dragElementId}
      dragElementType="goal"
      dragSourceId={dragSourceId}
    >
      Drag me!
    </DragElement>
  )
}
