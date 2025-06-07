import { useRef } from 'react'

import './DragArea.css'
import DragContainer from '../providers/DropContainer'

export default function DragArea1({
  children,
  dropAreaId,
}: {
  dropAreaId: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <DragContainer ref={ref} dropAreaId={dropAreaId} droppableTypes={['goal']}>
      {children}
    </DragContainer>
  )
}
