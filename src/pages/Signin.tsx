import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('PATIENT');

  const signup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
        email,
        password,
        role,
      })
      .then(() => {
        toast.success('Sign up successful.');
        navigate('/login');
      })
      .catch(() => {
        toast.error('Sign up failed.');
      });
  };

  return (
    <div className='flex flex-col items-center justify-center w-full my-12'>
      <form
        onSubmit={signup}
        className='flex flex-col items-center p-12 pb-6 rounded-md space-y-6 blackGradient'
      >
        <div className='flex max-w-xl w-72 justify-between'>
          <label htmlFor='email' className='text-white flex-1'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none bg-transparent border-b text-white'
          />
        </div>
        <div className='flex max-w-xl w-72 justify-between'>
          <label htmlFor='password' className='text-white flex-1'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none bg-transparent border-b text-white'
          />
        </div>
        <div className='flex max-w-xl w-72 justify-between'>
          <label htmlFor='role' className='text-white flex-1'>
            I am a
          </label>
          <select
            name='role'
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-48 bg-transparent text-white outline-none'
          >
            <option value='PATIENT' className='text-black'>
              Patient
            </option>
            <option value='PHYSIO' className='text-black'>
              Doctor
            </option>
          </select>
        </div>
        <button className='my-16 border border-primary p-2 transition-all rounded-sm bg-transparent hover:bg-primary text-primary hover:text-secondary'>
          Register
        </button>
        <p className='text-white'>
          already registered?{' '}
          <Link to='/login' className='text-primary hover:underline'>
            login
          </Link>
        </p>
      </form>
    </div>
  );
}
