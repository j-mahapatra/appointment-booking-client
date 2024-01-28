import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signin from './pages/Signin';
import Login from './pages/Login';

export default function App() {
  return (
    <div className='bg-secondary h-screen'>
      <BrowserRouter>
        <h1 className='text-primary text-center p-5 font-semibold text-3xl'>
          Appointment Booking
        </h1>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
