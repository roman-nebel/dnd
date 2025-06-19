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
type SourceContainer = DragBaseElement
type TargetContainer = DragBaseElement & {
  types: string[]
  ref?: any
}

interface DragAndDropContextType {
  dragElement: DragElement | null
  sourceContainer: SourceContainer | null
  targetContainer: TargetContainer | null
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

  function defaultDragStartHandler() {
    updateData({
      dragElement: { id, type, ref: dragRef.current },
    })
  }

  return {
    defaultDragStartHandler,
    dragRef: dragRef,
  }
}

export function usetargetContainer({
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
  const { dragElement, targetContainer, updateData } = useDragAndDrop()
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
        targetContainer?.id === id
    )
    updateState({ readyToDrop })
  }, [dragElement, targetContainer])

  function defaultDragEnterHandler() {
    setTimeout(() => {
      updateData({
        targetContainer: { id, types, ref: dropRef.current },
      })
    }, 16)
  }

  function defaultDragLeaveHandler() {
    updateData({ targetContainer: null })
  }

  function defaultDropHandler() {
    updateData({
      dragElement: null,
      sourceContainer: null,
      targetContainer: null,
    })
  }

  return {
    ...state,
    dropRef,
    defaultDragEnterHandler,
    defaultDragLeaveHandler,
    defaultDropHandler,
  }
}
