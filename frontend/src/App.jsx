import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import UpdateProject from './components/UpdateProject';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import Protected from './components/Protected';
import PageNotFound from './components/PageDoesNotExist';


function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Protected><ProjectList/></Protected>}/>
      <Route path='/addproject' element={<Protected><AddProject/></Protected>}/>
      <Route path='/update/:id' element={<Protected><UpdateProject/></Protected>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    </>
  )
}

export default App
