import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/Register/register';
import LoginPage from './Pages/Login/login';
import VerificationPage from './Pages/VerificationPage/verification';
import PostingPage from './Pages/Posts/postPage';
import ProfilePage from './Pages/Profile/profile';
import SendEmail from './Pages/ForgetPassword/sendEmail';
import ResetPassword from './Pages/ForgetPassword/resetPassword';

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
        <Route path='/profile' element={
          <>
            <ProfilePage />
          </>
        } />
        <Route path='/send-email-forget-password' element={
          <>
            <SendEmail />
          </>
        } />
        <Route path='/forgetpassword' element={
          <>
            <ResetPassword />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
