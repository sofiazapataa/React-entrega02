import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Error from './components/Error';
import Home from './components/Home';
import Layout from './components/Layout';
import Nosotros from './components/Nosotros';
import Tienda from './components/Tienda';
import Detalle from './components/Detalle';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element= {<Home/>}/>
        <Route path='/nosotros' element= {<Nosotros/>}/>
        <Route path='/tienda' element= {<Tienda/>}/>
        <Route path='/tienda/id:' element= {<Detalle/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}
export default App
