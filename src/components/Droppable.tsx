import React from 'react'
import { useDragAndDrop, usetargetContainer } from '../provider/DragAndDrop'
import setClassNames from '../utils/classNames'

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
    defaultDragEnterHandler,
    defaultDropHandler,
    defaultDragLeaveHandler,
  } = usetargetContainer(droppableContainer)
  return (
    <div
      ref={dropRef}
      data-drop-id={dropId}
      className={setClassNames([
        className,
        'droppable',
        canBeDropped ? '_available' : '',
        readyToDrop ? '_ready' : '',
      ])}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        onDragEnter && onDragEnter(e, dragElement)
        defaultDragEnterHandler()
      }}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        onDragOver && onDragOver(e, dragElement)
      }}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        onDragLeave && onDragLeave(e, dragElement)
        defaultDragLeaveHandler()
      }}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        onDragEnd && onDragEnd(e, dragElement?.ref, dropRef?.current)
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (dragElement && canBeDropped)
          onDrop && onDrop(e, dragElement?.ref, dropRef?.current)
        defaultDropHandler()
      }}
      {...props}
    >
      {children}
    </div>
  )
}
