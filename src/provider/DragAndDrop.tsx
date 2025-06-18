import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react'

type DragBaseElement = {
  id: string
}

type DragElement = DragBaseElement & { type: string; ref?: any }
type DragContainer = DragBaseElement & { availableActions?: string[] }
type DropContainer = DragBaseElement & {
  types: string[]
  availableActions?: string[]
  ref?: any
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

export function useDragElement({ id, type }: { id: string; type: string }) {
  const { updateData } = useDragAndDrop()
  const dragElementRef = useRef(null)

  function dragStartHandler() {
    //hideElement(dragElementRef)

    updateData({
      dragElement: { id, type, ref: dragElementRef.current },
    })
  }

  return {
    dragStartHandler,
    dragRef: dragElementRef.current,
  }
}

export function useDropContainer({
  id,
  types,
}: {
  id: string
  types: string[]
}) {
  const [state, setState] = useState({
    canBeDropped: false,
    readyToDrop: false,
  })
  const { dragElement, dropContainer, updateData } = useDragAndDrop()
  const dropContainerRef = useRef(null)

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
    const canBeDropped = Boolean(types.includes(dragElement?.type))
    updateState({ canBeDropped })
  }, [dragElement])

  useEffect(() => {
    const readyToDrop = Boolean(
      dragElement?.type &&
        types.includes(dragElement?.type) &&
        dropContainer?.id === id
    )
    updateState({ readyToDrop })
  }, [dragElement, dropContainer])

  function dragEnterHandler(onDragEnter?: () => void) {
    console.log(dragElement, dropContainer)
    setTimeout(() => {
      onDragEnter && onDragEnter()
      updateData({
        dropContainer: { id, types, ref: dropContainerRef.current },
      })
      console.log('Drag enter:', id)
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
    const dropContainerRef = findDroppableContainer(id)
    onDrop && onDrop(state.canBeDropped, dragElementRef, dropContainerRef)
    ;(dragElementRef as HTMLElement)?.style.setProperty('display', 'inherit')
    showElement(dragElementRef)
    updateData({ dragElement: null, dragContainer: null, dropContainer: null })
  }

  return {
    ...state,
    ref: dropContainerRef.current,
    dragEnterHandler,
    dragLeaveHandler,
    dropHandler,
  }
}
