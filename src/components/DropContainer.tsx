import React from 'react'
import { useDropContainer } from '../provider/DragAndDrop'

interface DropContainerProps {
  className?: string
  dropAreaId: string
  droppableTypes?: string[]
  onDragEnter?: () => void
  onDragLeave?: () => void
  onDrop?: (
    canBeDropped: boolean,
    dragElementRef: any,
    dropElementRef: any
  ) => void
  children?: React.ReactNode
}

export default function DropContainer({
  className,
  dropAreaId,
  droppableTypes,
  onDragEnter,
  onDragLeave,
  onDrop,
  children,
}: DropContainerProps) {
  const droppableContainer = {
    id: dropAreaId,
    droppableTypes: droppableTypes || [],
  }
  const {
    canBeDropped,
    readyToDrop,
    dragEnterHandler,
    dropHandler,
    dragLeaveHandler,
  } = useDropContainer(droppableContainer)
  return (
    <div
      data-drop-container-id={dropAreaId}
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
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dropHandler(onDrop)
      }}
    >
      {children}
    </div>
  )
}
