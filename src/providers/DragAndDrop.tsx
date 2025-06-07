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
  const { updateData } = useDragAndDrop()

  function dragStartHandler(source: DragSource) {
    if (!instanceData?.ref?.current) {
      return
    }

    updateData({
      draggableObject: {
        ...instanceData,
        ref: instanceData.ref.current,
      },
      source: source,
    })
  }

  return {
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
      draggableObject?.type &&
        target?.droppableTypes &&
        target.droppableTypes.includes(draggableObject?.type) &&
        target?.id === instanceData?.id
    )
    updateState({ readyToDrop })
  }, [target])

  function dragEnterHandler() {
    setTimeout(() => {
      updateData({ target: instanceData })
    }, 16)
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function dragLeaveHandler() {
    updateData({ target: null })
  }

  function dropHandler() {
    if (state.canBeDropped && draggableObject?.ref && target?.ref) {
      target.ref.appendChild(draggableObject.ref)
    }
    updateData({ draggableObject: null, source: null, target: null })
  }

  return {
    ...state,
    dragEnterHandler,
    dragOverHandler,
    dragLeaveHandler,
    dropHandler,
  }
}
