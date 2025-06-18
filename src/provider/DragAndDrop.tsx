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

interface DragAndDropContextType {
  dragElement: DragElement | null
  dragContainer: DragContainer | null
  dropContainer: DropContainer | null
  updateData: (newData: Partial<DragAndDropContextType>) => void
}

const DragAndDropContext = createContext<DragAndDropContextType | undefined>(
  undefined
)

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

export const useDragAndDrop = (): DragAndDropContextType => {
  const context = useContext(DragAndDropContext)
  if (!context) {
    throw new Error('useDragAndDrop must be used within a DragAndDropProvider')
  }
  return context
}

export function useDragElement({ id, type }: { id: string; type: string }) {
  const { updateData } = useDragAndDrop()
  const dragRef = useRef<HTMLDivElement | null>(null)

  function dragStartHandler() {
    //hideElement(dragRef.current)

    updateData({
      dragElement: { id, type, ref: dragRef.current },
    })
  }

  return {
    dragStartHandler,
    dragRef: dragRef,
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
  const dropRef = useRef<HTMLDivElement>(null)

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
    setTimeout(() => {
      onDragEnter && onDragEnter()
      updateData({
        dropContainer: { id, types, ref: dropRef.current },
      })
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
    onDrop && onDrop(state.canBeDropped, dragElement.ref, dropContainer?.ref)
    //showElement(dragElement.ref)
    updateData({ dragElement: null, dragContainer: null, dropContainer: null })
  }

  return {
    ...state,
    dropRef,
    dragEnterHandler,
    dragLeaveHandler,
    dropHandler,
  }
}
