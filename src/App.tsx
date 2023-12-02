import { Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Cambio } from './pages/Cambios/Cambio'
import { Layout } from './components/Layout'

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/cambios" element={ <Cambio /> } />
      </Route>
    </Routes>
  )
}

export default App
