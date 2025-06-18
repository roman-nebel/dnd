import React from 'react'
import { useDropContainer } from '../provider/DragAndDrop'

interface DroppableProps {
  className?: string
  dropId: string
  droppableTypes?: string[]
  onDragEnter?: () => void
  onDragLeave?: () => void
  onDragEnd?: () => void
  onDrop?: (
    canBeDropped: boolean,
    dragElementRef: any,
    dropElementRef: any
  ) => void
  children?: React.ReactNode
  [key: string]: any // Allow additional props
}

export default function Droppable({
  className,
  dropId,
  droppableTypes,
  onDragEnter,
  onDragLeave,
  onDragEnd,
  onDrop,
  children,
  ...props
}: DroppableProps) {
  const droppableContainer = {
    id: dropId,
    types: droppableTypes || [],
  }
  const {
    canBeDropped,
    readyToDrop,
    dropRef,
    dragEnterHandler,
    dropHandler,
    dragLeaveHandler,
  } = useDropContainer(droppableContainer)
  return (
    <div
      ref={dropRef}
      data-drop-id={dropId}
      className={`dropzone${canBeDropped ? ' _highlight' : ''}${readyToDrop ? ' _ready' : ''} ${className || ''}`}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dragEnterHandler(onDragEnter)
      }}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dragLeaveHandler(onDragLeave)
      }}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        onDragEnd && onDragEnd()
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dropHandler(onDrop)
      }}
    >
      {children}
    </div>
  )
}
