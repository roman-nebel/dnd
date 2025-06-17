import { Route, Routes } from 'react-router-dom'
import './App.css'
import DragAndDrop from './pages/DragAndDrop'
import { DragAndDropProvider } from '../src/provider/DragAndDrop'

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
