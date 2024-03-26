import './App.css';
import {Routes,Route} from 'react-router-dom';
import { Home } from './screens/Home';
import { Register } from './screens/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './screens/Login';

function App() {
  return (
    <>
    <div className="bg"></div>
      <Routes>
        <Route path='' element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>} />
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
