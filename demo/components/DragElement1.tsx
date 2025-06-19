import Draggable from '../../src/components/Draggable'
import setClassNames from '../../src/utils/classNames'

export default function DragElement1({
  className,
  dragId,
  children,
  ...props
}: any) {
  return (
    <Draggable
      className={setClassNames([className, 'draggable'])}
      dragId={dragId}
      dragType="goal"
      {...props}
    >
      {children}
    </Draggable>
  )
}
