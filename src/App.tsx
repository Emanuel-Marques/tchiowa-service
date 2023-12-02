import { Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Cambio } from './pages/Cambios/Cambio'

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/cambios" element={ <Cambio /> } />
    </Routes>
  )
}

export default App
