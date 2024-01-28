import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import ToastProvider from './providers/ToastProvider';
import { AuthProvider } from './providers/AuthProvider';
import Signin from './pages/Signin';
import Login from './pages/Login';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <div className='bg-secondary h-screen'>
      <BrowserRouter>
        <AuthProvider>
          <h1 className='text-primary text-center p-5 font-semibold text-3xl'>
            Appointment Booking
          </h1>
          <ToastProvider />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signin />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
