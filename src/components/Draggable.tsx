import React from 'react'
import { useDragElement } from '../provider/DragAndDrop'

interface DraggableProps {
  className?: string
  id?: string
  dragId: string
  dragType: string
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  children: React.ReactNode
  [key: string]: any // Allow additional props
}

export default function Draggable({
  className,
  id,
  dragId,
  dragType,
  onDragStart,
  children,
  ...props
}: DraggableProps) {
  const { dragStartHandler, dragRef } = useDragElement({
    id: dragId,
    type: dragType,
  })

  return (
    <div
      ref={dragRef}
      data-drag-element-id={dragId}
      className={className}
      draggable={true}
      onDragStart={(e) => {
        onDragStart && onDragStart(e)
        dragStartHandler()
      }}
      {...props}
    >
      {children}
    </div>
  )
}
