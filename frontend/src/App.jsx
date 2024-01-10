import './App.css';
import {Routes,Route} from 'react-router-dom';
import { Home } from './screens/Home';
import { Register } from './screens/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
