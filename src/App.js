import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/Register/register';
import LoginPage from './Pages/Login/login';
import VerificationPage from './Pages/VerificationPage/verification';
import PostingPage from './Pages/Posts/postPage';

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
        <Route path='/posts' element={
          <>
            <PostingPage />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
