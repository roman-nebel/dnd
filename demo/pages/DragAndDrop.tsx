import { useState } from 'react'
import DragArea1 from '../components/DragArea1'
import DragArea2 from '../components/DragArea2'
import DragElement1 from '../components/DragElement1'
import { useDragAndDrop } from '../../src/provider/DragAndDrop'
import DragElement2 from '../components/DragElement2'

export default function DragAndDrop() {
  const [state, setState] = useState({
    area1: ['el1', 'el2'],
    area2: ['el3', 'el4', 'el5'],
    area3: [],
  })
  const { dragElement, dragContainer, dropContainer } = useDragAndDrop()

  function dropHandler() {
    if (dragElement?.ref && dropContainer?.ref) {
      setState((prevState) => {
        const newState = { ...prevState }
        const dragId = dragElement?.ref.dataset.dragId
        const dropId = dropContainer?.ref.dataset.dropId

        for (const area in newState) {
          newState[area] = newState[area].filter((el) => el !== dragId)
        }

        if (newState[dropId]) {
          newState[dropId].push(dragId)
        }
        return newState
      })
    }
  }
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
      <div key={'area1'} className="drag-area">
        <h2>{'Area 1'}</h2>
        <DragArea1 dropId={'area1'} onDrop={dropHandler}>
          {state['area1'].map((el) => (
            <DragElement1 key={el} dragId={el} />
          ))}
        </DragArea1>
      </div>
      <div key={'area2'} className="drag-area">
        <h2>{'Area 2'}</h2>
        <DragArea1 dropId={'area2'} onDrop={dropHandler}>
          {state['area2'].map((el) => (
            <DragElement1 key={el} dragId={el} />
          ))}
        </DragArea1>
      </div>
      <div key={'area3'} className="drag-area">
        <h2>{'Area 3'}</h2>
        <div>
          <DragElement2 dragId={'el6'} />
          <DragElement2 dragId={'el7'} />
        </div>
        <DragArea2 dropId={'area3'} onDrop={dropHandler}>
          {state['area3'].map((el) => (
            <DragElement1 key={el} dragId={el} />
          ))}
        </DragArea2>
      </div>
    </div>
  )
}
