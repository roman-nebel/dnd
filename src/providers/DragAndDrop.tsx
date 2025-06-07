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
  updateData: (newData: Partial<DragAndDropContextType>) => void
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
    setData((prev: typeof data) => {
      return { ...prev, ...newData }
    })
  }

  return (
    <DragAndDropContext.Provider
      value={{
        ...data,
        updateData,
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

export function useDragElement(instanceData: any) {
  const { draggableObject, updateData } = useDragAndDrop()
  const isDragging = Boolean(draggableObject)

  function dragStartHandler(source: DragSource) {
    console.log('Drag started')
    if (instanceData?.ref) {
      instanceData.ref.ondragend = () =>
        updateData({ draggableObject: null, source: null, target: null })
    }
    updateData({ draggableObject: instanceData, source: source })
  }

  return {
    isDragging,
    dragStartHandler,
  }
}

export function useDragContainer(instanceData: any) {
  const [state, setState] = useState({
    canBeDropped: false,
    readyToDrop: false,
  })
  const { draggableObject, target, updateData } = useDragAndDrop()

  function updateState(newState: any) {
    setState((prev: any) => {
      return { ...prev, ...newState }
    })
  }

  useEffect(() => {
    const canBeDropped = Boolean(
      draggableObject &&
        instanceData.droppableTypes &&
        instanceData.droppableTypes.includes(draggableObject?.type)
    )
    updateState({ canBeDropped })
  }, [draggableObject])

  useEffect(() => {
    const readyToDrop = Boolean(
      draggableObject &&
        instanceData.droppableTypes &&
        instanceData.droppableTypes.includes(draggableObject?.type) &&
        target?.id === instanceData.id
    )
    updateState({ readyToDrop })
  }, [target])

  function dragEnterHandler(target: DragTarget) {
    setTimeout(() => {
      console.log('Drag enter')
      if (target?.ref) {
        target.ref.ondragover = (e) => e.preventDefault()
        target.ref.ondrop = (e) => {
          e.preventDefault()
          dropHandler()
        }
        target.ref.ondragleave = () => {
          dragLeaveHandler()
        }
      }
      if (
        !target.droppableTypes ||
        !target.droppableTypes.includes(draggableObject?.type || '')
      ) {
        return
      }
      updateData({ target })
    }, 16)
  }

  function dragLeaveHandler() {
    console.log('Drag left')
    updateData({ target: null })
  }

  function dropHandler() {
    console.log('Drop!')
    if (draggableObject?.ref && target?.ref) {
      target.ref.appendChild(draggableObject.ref)
    }
    updateData({ draggableObject: null, source: null, target: null })
  }

  return {
    ...state,
    dragEnterHandler,
    dragLeaveHandler,
    dropHandler,
  }
}
