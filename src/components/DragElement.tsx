import { useDragElement } from '../provider/DragAndDrop'
import React, { useEffect } from 'react'

interface DragElementProps {
  className?: string
  dragElementId: string
  dragSourceId: string
  dragElementType: string
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  children: React.ReactNode
}

export default function DragElement({
  className,
  dragElementId,
  dragSourceId,
  dragElementType,
  onDragStart,
  children,
}: DragElementProps) {
  const { dragStartHandler } = useDragElement({
    id: dragElementId,
    type: dragElementType,
  })

  return (
    <div
      data-drag-element-id={dragElementId}
      className={className}
      draggable={true}
      onDragStart={(e) => {
        onDragStart && onDragStart(e)
        dragStartHandler({ id: dragSourceId })
      }}
      style={{
        cursor: 'grab',
        transition: 'opacity 200ms ease',
        backgroundColor: '#f0f0f0',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  )
}
