import DragArea1 from '../components/DragArea1'
import DragArea2 from '../components/DragArea2'
import DragElement1 from '../components/DragElement1'
import { useDragAndDrop } from '../providers/DragAndDrop'

export default function DragAndDrop() {
  const { dragElement, dragContainer, dropContainer } = useDragAndDrop()
  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <p>
        Drag and drop functionality will be implemented here.{' '}
        <i>
          ({dragContainer?.id || 'No source'} –{' '}
          {dragElement?.id || 'None dragging'} –{' '}
          {dropContainer?.id || 'No target'})
        </i>
      </p>
      <DragArea1 dropAreaId="area1">
        <DragElement1 dragElementId={'el'} dragSourceId={'area1'} />
        <DragElement1 dragElementId={'el2'} dragSourceId={'area1'} />
        <DragElement1 dragElementId={'el3'} dragSourceId={'area1'} />
      </DragArea1>
      <DragArea1 dropAreaId="area2"></DragArea1>
      <DragArea2 dropAreaId="area3"></DragArea2>
    </div>
  )
}
