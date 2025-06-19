import { useState } from 'react'
import DragArea1 from '../components/DragArea1'
import DragArea2 from '../components/DragArea2'
import DragElement1 from '../components/DragElement1'
import { useDragAndDrop } from '../../src/provider/DragAndDrop'
import DragElement2 from '../components/DragElement2'

const initialState = {
  area1: [
    { id: 'el1', name: 'Element 1' },
    { id: 'el2', name: 'Element 2' },
  ],
  area2: [
    { id: 'el3', name: 'Element 3' },
    { id: 'el4', name: 'Element 4' },
    { id: 'el5', name: 'Element 5' },
  ],
  area3: [{ id: 'el6', name: 'Element 6' }],
}

export default function DragAndDrop() {
  const [state, setState] = useState(initialState)
  const { dragElement, sourceContainer, targetContainer } = useDragAndDrop()

  function dropHandler() {
    if (dragElement?.ref && targetContainer?.ref) {
      setState((prevState) => {
        const newState = { ...prevState }
        const dragId = dragElement?.ref.dataset.dragId
        const dropId = targetContainer?.ref.dataset.dropId

        for (const area in newState) {
          newState[area] = newState[area].filter((el) => el.id !== dragId)
        }

        if (newState[dropId]) {
          newState[dropId].push({
            id: dragId,
            name: dragElement?.ref.textContent || 'New Element',
          })
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
          ({sourceContainer?.id || 'No source'} –{' '}
          {dragElement?.id || 'None dragging'} –{' '}
          {targetContainer?.id || 'No target'})
        </i>
      </p>
      <div key={'area1'} className="drag-area">
        <h2>Area 1</h2>
        <DragArea1 dropId={'area1'} onDrop={dropHandler}>
          {state['area1'].map((el) => (
            <DragElement1 key={el.id} dragId={el.id}>
              {el.name}
            </DragElement1>
          ))}
        </DragArea1>
      </div>
      <div key={'area2'} className="drag-area">
        <h2>Area 2</h2>
        <DragArea1 dropId={'area2'} onDrop={dropHandler}>
          {state['area2'].map((el) => (
            <DragElement1 key={el.id} dragId={el.id}>
              {el.name}
            </DragElement1>
          ))}
        </DragArea1>
      </div>
      <div key={'area3'} className="drag-area">
        <h2>Area 3</h2>
        <DragArea2 dropId={'area3'} onDrop={dropHandler}>
          {state['area3'].map((el) => (
            <DragElement2 key={el.id} dragId={el.id}>
              {el.name}
            </DragElement2>
          ))}
        </DragArea2>
      </div>
    </div>
  )
}
