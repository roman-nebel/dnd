import DragArea1 from '../components/DragArea1'
import DragArea2 from '../components/DragArea2'
import DragElement1 from '../components/DragElement1'
import { useDragAndDrop } from '../providers/DragAndDrop'

export default function DragAndDrop() {
  const { draggableObject, source, target } = useDragAndDrop()
  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <p>
        Drag and drop functionality will be implemented here.{' '}
        <i>
          ({source?.id || 'No source'} –{' '}
          {draggableObject?.id || 'None dragging'} – {target?.id || 'No target'}
          )
        </i>
      </p>
      <DragArea1 dragAreaId="area1">
        <DragElement1 draggableId={'el'} dragSourceId={'area1'}></DragElement1>
      </DragArea1>
      <DragArea1 dragAreaId="area2"></DragArea1>
      <DragArea2 dragAreaId="area3"></DragArea2>
    </div>
  )
}
