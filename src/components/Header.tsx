import { useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`)
      .then(() => {
        toast.success('Logged out successfully');
        sessionStorage.clear();
        setUser(undefined);
        navigate('/login');
      })
      .catch(() => {
        toast.error('Logout failed.');
      });
  };

  return (
    <div className='flex items-center w-full justify-between p-5'>
      <h1 className='flex-1 text-primary text-center p-5 font-semibold text-xl sm:text-3xl'>
        Appointment Booking
      </h1>
      {user && (
        <button
          onClick={logout}
          className='sm:absolute top-8 right-2 h-12 border border-primary p-2 mr-5 transition-all rounded-sm bg-transparent hover:bg-primary text-primary hover:text-secondary'
        >
          Logout
        </button>
      )}
    </div>
  );
}
