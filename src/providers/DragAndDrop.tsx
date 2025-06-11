import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

type DragBaseElement = {
  id: string
  ref?: React.RefObject<HTMLDivElement> | null
}

type DragElement = DragBaseElement & { type: string }
type DragSource = DragBaseElement & { availableActions?: string[] }
type DragTarget = DragBaseElement & {
  droppableTypes?: string[]
  availableActions?: string[]
}

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

function showElement(ref: any) {
  setTimeout(() => {
    if (ref) {
      ref.current.style.display = 'inherit'
      ref.current.style.opacity = '1'
      ref.current.style.pointerEvents = 'auto'
    }
  }, 0)
}

function hideElement(ref: any) {
  setTimeout(() => {
    if (ref) {
      ref.current.style.display = 'none'
      ref.current.style.opacity = '0'
      ref.current.style.pointerEvents = 'none'
    }
  }, 0)
}

function findDroppableAncestor(instance: any, draggable: any) {
  let current = instance
  while (current) {
    if (
      current.droppableTypes &&
      draggable.type &&
      current.droppableTypes.includes(draggable.type)
    ) {
      return current
    }
    current = current.parent
  }
  return null
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
    if (!instanceData?.ref) {
      return
    }

    hideElement(instanceData.ref)

    updateData({
      draggableObject: {
        ...instanceData,
        ref: instanceData.ref,
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
      console.log('dragEnterHandler', instanceData, draggableObject)
      const droppableAncestor = findDroppableAncestor(
        instanceData,
        draggableObject
      )
      if (droppableAncestor) {
        updateData({ target: droppableAncestor })
      }
    }, 16)
  }

  function dragLeaveHandler() {
    updateData({ target: null })
  }

  function dropHandler() {
    draggableObject?.ref?.current?.style.setProperty('display', 'inherit')
    showElement(draggableObject?.ref)
    updateData({ draggableObject: null, source: null, target: null })
  }

  return {
    ...state,
    dragEnterHandler,
    dragLeaveHandler,
    dropHandler,
  }
}
