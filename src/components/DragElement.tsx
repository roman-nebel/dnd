import { useDragElement } from '../providers/DragAndDrop'
import React from 'react'

export default React.forwardRef(
  (
    {
      className,
      dragElementId,
      dragSourceId,
      type,
      onDragStart,
      children,
    }: any,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { dragStartHandler } = useDragElement({
      id: dragElementId,
      type,
      ref,
    })
    return (
      <div
        ref={ref}
        className={className}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', 'someData')
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
