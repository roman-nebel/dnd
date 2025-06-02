import React, { createContext, useContext, useState, ReactNode } from 'react'

type DragBaseElement = {
  id: string
  ref?: HTMLDivElement | null
}

type DragElement = DragBaseElement

type DragTarget = DragBaseElement

type DragSource = DragBaseElement

// Define the context type
interface DragAndDropContextType {
  draggableObject: any | null
  setDraggableObject: (object: any | null) => void
  source: any | null
  setSource: (source: any | null) => void
  target: any | null
  setTarget: (target: any | null) => void
  isDragging: boolean // Computed property
  dragStartHandler: (element: DragElement, source: DragSource) => void
  dragEndHandler: () => void
  dragOverHandler: (target: DragTarget) => void
  dragLeaveHandler: () => void
}

// Create the context
const DragAndDropContext = createContext<DragAndDropContextType | undefined>(
  undefined
)

// Create the provider component
interface DragAndDropProviderProps {
  children: ReactNode
}

export const DragAndDropProvider: React.FC<DragAndDropProviderProps> = ({
  children,
}) => {
  const [draggableObject, setDraggableObject] = useState<any | null>(null)
  const [source, setSource] = useState<any | null>(null)
  const [target, setTarget] = useState<any | null>(null)

  const isDragging = draggableObject !== null // Compute dragging state

  function dragStartHandler(element: DragElement, source: DragSource) {
    console.log('Drag started')
    setDraggableObject(element)
    setSource(source)
  }

  function dragEndHandler() {
    console.log('Drag ended')
    if (!draggableObject || !target) {
      console.warn('No draggable object or target to drop into.')
      return
    }

    target.ref.appendChild(draggableObject.ref)
    setDraggableObject(null)
    setSource(null)
    setTarget(null)
  }

  function dragOverHandler(target: DragTarget) {
    console.log('Drag over')
    setTarget(target)
  }

  function dragLeaveHandler() {
    console.log('Drag left')
    setTarget(null)
  }

  return (
    <DragAndDropContext.Provider
      value={{
        draggableObject,
        setDraggableObject,
        source,
        setSource,
        target,
        setTarget,
        isDragging,
        dragStartHandler,
        dragEndHandler,
        dragOverHandler,
        dragLeaveHandler,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  )
}

// Custom hook to use the context
export const useDragAndDrop = (): DragAndDropContextType => {
  const context = useContext(DragAndDropContext)
  if (!context) {
    throw new Error('useDragAndDrop must be used within a DragAndDropProvider')
  }
  return context
}
