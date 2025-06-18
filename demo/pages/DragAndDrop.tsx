import { useState } from 'react'
import DragArea1 from '../components/DragArea1'
import DragArea2 from '../components/DragArea2'
import DragElement1 from '../components/DragElement1'
import { useDragAndDrop } from '../../src/provider/DragAndDrop'

export default function DragAndDrop() {
  const [state, setState] = useState({
    area1: ['el1', 'el2'],
    area2: ['el3', 'el4', 'el5'],
    area3: [],
  })
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
      {(Object.keys(state) as Array<keyof typeof state>).map((areaId) => {
        return (
          <div key={areaId} className="drag-area">
            <h2>{areaId}</h2>
            <DragArea1 dropId={areaId}>
              {state[areaId].map((el) => (
                <DragElement1 key={el} dragId={el} />
              ))}
            </DragArea1>
          </div>
        )
      })}
    </div>
  )
}
