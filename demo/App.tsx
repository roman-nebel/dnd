import { Route, Routes } from 'react-router-dom'
import './App.css'
import DragAndDrop from './pages/DragAndDrop'
import { DragAndDropProvider } from './providers/DragAndDrop'

const App = () => {
  return (
    <DragAndDropProvider>
      <Routes>
        <Route path={'/'} element={<DragAndDrop />} />
      </Routes>
    </DragAndDropProvider>
  )
}

export default App
