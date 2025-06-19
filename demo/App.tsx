import './App.css'
import DragAndDrop from './pages/DragAndDrop'
import { DragAndDropProvider } from '../src/provider/DragAndDrop'

const App = () => {
  return (
    <DragAndDropProvider>
      <DragAndDrop />
    </DragAndDropProvider>
  )
}

export default App
