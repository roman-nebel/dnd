import DragElement from '../../src/components/DragElement'

export default function DragElement1({ id, dragId }: any) {
  return (
    <DragElement
      id={id}
      dragId={dragId || id}
      dragType="goal"
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
