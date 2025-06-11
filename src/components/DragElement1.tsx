import DragElement from '../providers/DragElement'

export default function DragElement1({ dragElementId, dragSourceId }: any) {
  return (
    <DragElement
      dragElementId={dragElementId}
      dragElementType="goal"
      dragSourceId={dragSourceId}
    >
      Drag me!
    </DragElement>
  )
}
