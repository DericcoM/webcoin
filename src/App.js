import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main/Main'

function App() {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
        </Route>
      </Routes>
  )
}

export default App