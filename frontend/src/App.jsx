import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/Login';
import HomePage from './pages/PrincipalPage';


function App(){
  return (

      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <LoginPage /> }/>
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/home' element={ <HomePage /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;