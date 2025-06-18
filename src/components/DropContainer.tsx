import React from 'react'
import { useDropContainer } from '../provider/DragAndDrop'

interface DropContainerProps {
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

export default function DropContainer({
  className,
  dropId,
  droppableTypes,
  onDragEnter,
  onDragLeave,
  onDragEnd,
  onDrop,
  children,
  ...props
}: DropContainerProps) {
  const droppableContainer = {
    id: dropId,
    types: droppableTypes || [],
  }
  const {
    canBeDropped,
    readyToDrop,
    ref,
    dragEnterHandler,
    dropHandler,
    dragLeaveHandler,
  } = useDropContainer(droppableContainer)
  return (
    <div
      ref={ref}
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
