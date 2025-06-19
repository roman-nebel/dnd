import React from 'react'
import { useDragAndDrop, useDropContainer } from '../provider/DragAndDrop'
import setlassNames from '../utils/classNames'

type BaseHandlers = {
  onDragEnter?: () => void
  onDragLeave?: () => void
  onDragOver?: () => void
  onDragEnd?: () => void
  onDrop?: () => void
}

type TypeSpecificHandlers = {
  [key: string]: BaseHandlers
}

type Handlers = BaseHandlers & TypeSpecificHandlers

interface DroppableProps {
  className?: string | null
  dropId: string
  handlers?: Handlers | any
  children?: React.ReactNode
  [key: string]: any
}

export default function Droppable({
  className = null,
  dropId,
  handlers = {},
  children,
  ...props
}: DroppableProps) {
  const droppableTypes =
    Object.keys(handlers).filter((key) => {
      const value = handlers[key]
      return (
        typeof value === 'object' &&
        value !== null &&
        typeof value !== 'function'
      )
    }) || []
  const droppableContainer = {
    id: dropId,
    types: droppableTypes || [],
  }

  const { onDragEnter, onDragLeave, onDragOver, onDragEnd, onDrop } = handlers

  const { dragElement } = useDragAndDrop()
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
      className={setlassNames([
        className,
        'droppable',
        canBeDropped ? '_available' : '',
        readyToDrop ? '_ready' : '',
      ])}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dragEnterHandler()
        onDragEnter && onDragEnter()
      }}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        onDragOver && onDragOver()
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dragLeaveHandler()
        onDragLeave && onDragLeave()
      }}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        onDragEnd && onDragEnd()
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e && e.preventDefault()
        dropHandler()
        if (dragElement && canBeDropped) onDrop && onDrop()
      }}
      {...props}
    >
      {children}
    </div>
  )
}
