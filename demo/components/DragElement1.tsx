import DragElement from '../../src/components/DragElement'

export default function DragElement1({ dragElementId, dragSourceId }: any) {
  return (
    <DragElement
      dragElementId={dragElementId}
      dragElementType="goal"
      dragSourceId={dragSourceId}
      style={{
        cursor: 'grab',
        transition: 'opacity 200ms ease',
        backgroundColor: '#f0f0f0',
        userSelect: 'none',
      }}
    >
      Drag me!
    </DragElement>
  )
}
