import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/PrincipalPage';
<<<<<<< HEAD
import ProfesorForm from './pages/profesorFormulario';
import { AuthProvider } from "./context/auth.context";
=======
import Alumnos from './pages/Alumnos';



>>>>>>> cf15d4c (Archivo alumnos y base de datos)
function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
<<<<<<< HEAD
        <Routes>
          <Route path='/' element={ <LoginPage /> }/>
          <Route path='/login' element={ <LoginPage /> }/>
          <Route path='/home' element={ <HomePage /> }/>
          <Route path='/add_profesor' element={ <ProfesorForm /> }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
=======
      <Routes>
        <Route path='/' element={ <LoginPage /> }/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/home' element={ <HomePage /> }/>
        <Route path='/alumnos' element={ <Alumnos /> }/>
      </Routes>
    </BrowserRouter>
>>>>>>> cf15d4c (Archivo alumnos y base de datos)
  )
}

export default App;