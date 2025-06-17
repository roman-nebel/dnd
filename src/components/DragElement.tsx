import React from 'react'
import { useDragElement } from '../provider/DragAndDrop'

interface DragElementProps {
  className?: string
  dragElementId: string
  dragSourceId: string
  dragElementType: string
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  children: React.ReactNode
  [key: string]: any // Allow additional props
}

export default function DragElement({
  className,
  dragElementId,
  dragSourceId,
  dragElementType,
  onDragStart,
  children,
  ...props
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
      {...props}
    >
      {children}
    </div>
  )
}
