import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/Register/register';
import LoginPage from './Pages/Login/login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <RegisterPage />
          </>
        } />
        <Route path='/login' element={
          <>
            <LoginPage />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
