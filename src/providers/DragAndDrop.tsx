import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

type DragBaseElement = {
  id: string
}

type DragElement = DragBaseElement & { type: string }
type DragContainer = DragBaseElement & { availableActions?: string[] }
type DropContainer = DragBaseElement & {
  droppableTypes: string[]
  availableActions?: string[]
}

// Define the context type
interface DragAndDropContextType {
  dragElement: DragElement | null
  dragContainer: DragContainer | null
  dropContainer: DropContainer | null
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
function findDraggableElement(id: string | null) {
  const element = document.querySelector('[data-drag-element-id="' + id + '"]')
  return element || null
}

function findDroppableContainer(id: string | null) {
  const element = document.querySelector(
    '[data-drop-container-id="' + id + '"]'
  )
  return element || null
}

function showElement(ref: any) {
  setTimeout(() => {
    if (ref) {
      ref.style.display = 'inherit'
      ref.style.opacity = '1'
      ref.style.pointerEvents = 'auto'
    }
  }, 0)
}

function hideElement(ref: any) {
  setTimeout(() => {
    if (ref) {
      ref.style.display = 'none'
      ref.style.opacity = '0'
      ref.style.pointerEvents = 'none'
    }
  }, 0)
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

export function useDragElement(dragElement: DragElement) {
  const { updateData } = useDragAndDrop()

  function dragStartHandler(dragContainer: DragContainer) {
    const { id } = dragElement
    const dragElementRef = findDraggableElement(id)
    if (!dragElementRef) {
      console.warn('Draggable element not found:', id)
      return
    }

    hideElement(dragElementRef)

    updateData({
      dragElement,
      dragContainer,
    })
  }

  return {
    dragStartHandler,
  }
}

export function useDropContainer(container: DropContainer) {
  const [state, setState] = useState({
    canBeDropped: false,
    readyToDrop: false,
  })
  const { dragElement, dropContainer, updateData } = useDragAndDrop()

  function updateState(newState: any) {
    setState((prev: any) => {
      return { ...prev, ...newState }
    })
  }

  useEffect(() => {
    if (!dragElement) {
      updateState({ canBeDropped: false, readyToDrop: false })
      return
    }
    const canBeDropped = Boolean(
      container.droppableTypes.includes(dragElement?.type)
    )
    updateState({ canBeDropped })
  }, [dragElement])

  useEffect(() => {
    const readyToDrop = Boolean(
      dragElement?.type &&
        container?.droppableTypes &&
        container.droppableTypes.includes(dragElement?.type) &&
        dropContainer?.id === container.id
    )
    updateState({ readyToDrop })
  }, [dragElement, dropContainer])

  function dragEnterHandler(onDragEnter?: () => void) {
    setTimeout(() => {
      onDragEnter && onDragEnter()
      updateData({ dropContainer: container })
      console.log('Drag enter:', findDroppableContainer(container?.id || null))
    }, 16)
  }

  function dragLeaveHandler(onDragLeave?: () => void) {
    onDragLeave && onDragLeave()
    updateData({ dropContainer: null })
  }

  function dropHandler(
    onDrop?: (
      canBeDropped: boolean,
      dragElementRef: any,
      dropContainerRef: any
    ) => void
  ) {
    if (!dragElement || !state.canBeDropped) return
    const dragElementRef = findDraggableElement(dragElement?.id)
    const dropContainerRef = findDroppableContainer(container.id)
    onDrop && onDrop(state.canBeDropped, dragElementRef, dropContainerRef)
    ;(dragElementRef as HTMLElement)?.style.setProperty('display', 'inherit')
    showElement(dragElementRef)
    updateData({ dragElement: null, dragContainer: null, dropContainer: null })
  }

  return {
    ...state,
    dragEnterHandler,
    dragLeaveHandler,
    dropHandler,
  }
}
