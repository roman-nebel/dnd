import React from 'react'
import { useDragContainer } from './DragAndDrop'

interface DropContainerProps {
  className?: string
  dropAreaId: string
  droppableTypes?: string[]
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void
  children?: React.ReactNode
}

export default React.forwardRef<HTMLDivElement, DropContainerProps>(
  (
    {
      className,
      dropAreaId,
      droppableTypes,
      onDragEnter,
      onDragLeave,
      onDrop,
      children,
    }: DropContainerProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const droppableContainer = {
      id: dropAreaId,
      droppableTypes: droppableTypes || [],
      ref: ref,
    }
    const {
      canBeDropped,
      readyToDrop,
      dragEnterHandler,
      dropHandler,
      dragLeaveHandler,
    } = useDragContainer(droppableContainer)
    return (
      <div
        ref={ref}
        className={`dropzone${canBeDropped ? ' _highlight' : ''}${readyToDrop ? ' _ready' : ''} ${className || ''}`}
        onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
          e && e.preventDefault()
          onDragEnter && onDragEnter(e)
          dragEnterHandler()
        }}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e && e.preventDefault()
        }}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
          e && e.preventDefault()
          onDragLeave && onDragLeave(e)
          dragLeaveHandler()
        }}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
          e && e.preventDefault()
          onDrop && onDrop(e)
          dropHandler()
        }}
      >
        {children}
      </div>
    )
  }
)
