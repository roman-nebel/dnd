import React from 'react'
import { useDragElement } from '../provider/DragAndDrop'
import setClassNames from '../utils/classNames'

interface DraggableProps {
  className?: string | null
  id?: string
  dragId: string
  dragType: string
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  children: React.ReactNode
  [key: string]: any
}

export default function Draggable({
  className = null,
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
      className={setClassNames([className, 'draggable'])}
      data-drag-id={dragId}
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
