import { useDragElement } from './DragAndDrop'
import React from 'react'

interface DragElementProps {
  className?: string
  dragElementId: string
  dragSourceId: string
  dragElementType: string
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  children: React.ReactNode
}

export default React.forwardRef<HTMLDivElement, DragElementProps>(
  (
    {
      className,
      dragElementId,
      dragSourceId,
      dragElementType,
      onDragStart,
      children,
    }: DragElementProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { dragStartHandler } = useDragElement({
      id: dragElementId,
      type: dragElementType,
      ref,
    })
    return (
      <div
        ref={ref}
        className={className}
        draggable={true}
        onDragStart={(e) => {
          onDragStart && onDragStart(e)
          dragStartHandler({ id: dragSourceId })
        }}
        style={{
          cursor: 'grab',
          backgroundColor: '#f0f0f0',
          userSelect: 'none',
        }}
      >
        {children}
      </div>
    )
  }
)
