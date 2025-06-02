import DragArea1 from '../components/DragArea1'
import DragElement1 from '../components/DragElement1'
import { useDragAndDrop } from '../providers/DragAndDrop'

export default function DragAndDrop() {
  const { isDragging, draggableObject, source, target } = useDragAndDrop()
  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <p>Drag and drop functionality will be implemented here.</p>
      {isDragging && (
        <p>
          {source?.id || 'No source'} – {draggableObject?.id || 'None dragging'}{' '}
          – {target?.id || 'No target'}
        </p>
      )}
      <DragArea1 dragAreaId="area1">
        <DragElement1 draggableId={'el'} dragSourceId={'area1'}></DragElement1>
      </DragArea1>
      <DragArea1 dragAreaId="area2"></DragArea1>
    </div>
  )
}
