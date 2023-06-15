import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/Register/register';
import LoginPage from './Pages/Login/login';
import VerificationPage from './Pages/VerificationPage/verification';

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
        <Route path='/verification' element={
          <>
            <VerificationPage />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
