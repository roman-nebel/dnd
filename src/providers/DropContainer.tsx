import React from 'react'
import { useDragContainer } from './DragAndDrop'

export default React.forwardRef(
  (
    {
      className,
      dropAreaId,
      droppableTypes,
      onDragEnter,
      onDragLeave,
      onDrop,
      children,
    }: any,
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
