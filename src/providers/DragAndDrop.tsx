import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

type DragBaseElement = {
  id: string
  ref?: HTMLDivElement | null
}

type DragElement = DragBaseElement & { type: string }
type DragSource = DragBaseElement
type DragTarget = DragBaseElement & { droppableTypes?: string[] }

// Define the context type
interface DragAndDropContextType {
  draggableObject: DragElement | null
  source: DragSource | null
  target: DragTarget | null
  isDragging: boolean
  dragStartHandler: (element: DragElement, source: DragSource) => void
  dragEndHandler: () => void
  dragOverHandler: (target: DragTarget) => void
  dragLeaveHandler: () => void
  subscribe: (callback: () => void) => () => void
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
  const [data, setData] = useState<any | null>({})

  function updateData(newData: any) {
    setData({ ...data, ...newData })
  }

  const isDragging = data.draggableObject !== null

  function dragStartHandler(element: DragElement, source: DragSource) {
    console.log('Drag started')
    updateData({ draggableObject: element, source: source })
  }

  function dragEndHandler() {
    console.log('Drag ended')
    if (!data.draggableObject || !data.target) {
      console.warn('No draggable object or target to drop into.')
      return
    }

    data.target.ref.appendChild(data.draggableObject.ref)
    updateData({ draggableObject: null, source: null, target: null })
  }

  function dragOverHandler(target: DragTarget) {
    console.log('Drag over')
    if (
      !target.droppableTypes ||
      !target.droppableTypes.includes(data.draggableObject?.type)
    ) {
      console.warn('Invalid drop target for the current draggable type.')
      return
    }
    updateData({ target })
  }

  function dragLeaveHandler() {
    console.log('Drag left')
    updateData({ target: null })
  }

  return (
    <DragAndDropContext.Provider
      value={{
        ...data,
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

export function useDragAndDropEvents(instanceData: any) {
  const [state, setState] = useState({
    canBeDropped: false,
    readyToDrop: false,
  })
  const { isDragging, draggableObject, target } = useDragAndDrop()

  useEffect(() => {
    console.log('Checking if can be dropped', {
      draggableObject,
      instanceData,
    })
    const canBeDropped = Boolean(
      draggableObject &&
        instanceData.droppableTypes &&
        instanceData.droppableTypes.includes(draggableObject.type)
    )
    setState({ ...state, canBeDropped })
  }, [draggableObject])

  useEffect(() => {
    const readyToDrop = Boolean(
      draggableObject &&
        instanceData.droppableTypes &&
        isDragging &&
        instanceData.droppableTypes.includes(draggableObject.type) &&
        target?.id === instanceData.id
    )
    setState({ ...state, readyToDrop })
  }, [target])

  return state
}
