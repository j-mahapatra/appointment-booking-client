import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import ToastProvider from './providers/ToastProvider';
import { AuthProvider } from './providers/AuthProvider';
import Signin from './pages/Signin';
import Login from './pages/Login';
import Header from './components/Header';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <div className='bg-secondary h-screen'>
      <BrowserRouter>
        <AuthProvider>
          <Header />
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
