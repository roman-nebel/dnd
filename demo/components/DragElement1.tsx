import Draggable from '../../src/components/Draggable'

export default function DragElement1({ id, dragId, children }: any) {
  return (
    <Draggable
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
      {children}
    </Draggable>
  )
}
