import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../providers/AuthProvider';
import PhysioView from './partials/PhysioView';
import PatientView from './partials/PatientView';
import SalesView from './partials/SalesView';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user?.role === 'PHYSIO') {
    return <PhysioView />;
  }

  if (user?.role === 'PATIENT') {
    return <PatientView />;
  }

  if (user?.role === 'SALES') {
    return <SalesView />;
  }

  return (
    <div className='flex flex-col w-full justify-center items-center py-16'>
      <p className='text-center text-white'>
        You need to login to access the application
      </p>
      <button
        onClick={() => {
          navigate('/login');
        }}
        className='my-16 w-48 border border-primary p-2 transition-all rounded-sm bg-transparent hover:bg-primary text-primary hover:text-secondary'
      >
        Login
      </button>
    </div>
  );
}
