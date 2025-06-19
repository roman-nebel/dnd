import React from 'react'
import { useDragElement } from '../provider/DragAndDrop'
import setClassNames from '../utils/classNames'

interface DraggableProps {
  className?: string | null
  id?: string
  dragId: string
  dragType: string
  onDragStart?: (dragContainerRef: HTMLDivElement | null) => void
  children: React.ReactNode
  [key: string]: any
}

export default function Draggable({
  className = null,
  dragId,
  dragType,
  onDragStart,
  children,
  ...props
}: DraggableProps) {
  const { defaultDragStartHandler, dragRef } = useDragElement({
    id: dragId,
    type: dragType,
  })

  return (
    <div
      ref={dragRef}
      className={setClassNames([className, 'draggable'])}
      data-drag-id={dragId}
      draggable={true}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        onDragStart && onDragStart(dragRef.current)
        defaultDragStartHandler()
      }}
      {...props}
    >
      {children}
    </div>
  )
}
