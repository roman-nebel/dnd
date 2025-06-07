import { useRef } from 'react'

import './DragArea.css'
import DragContainer from './DragContainer'

export default function DragArea1({
  children,
  dragAreaId,
}: {
  dragAreaId: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <DragContainer ref={ref} dragAreaId={dragAreaId} droppableTypes={['goal']}>
      {children}
    </DragContainer>
  )
}
