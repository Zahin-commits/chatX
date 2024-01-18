import './App.css';
import {Routes,Route} from 'react-router-dom';
import { Home } from './screens/Home';
import { Register } from './screens/Register';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
    {/* <div className="bg"></div> */}
      <Routes>
        <Route path='' element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>} />
        </Route>
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
