import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
        email,
        password,
      })
      .then((res) => {
        toast.success('Login successful.');
        setUser(res.data);
        navigate('/');
      })
      .catch(() => {
        toast.error('Login failed.');
      });
  };

  return (
    <div className='flex flex-col items-center justify-center w-full my-12'>
      <form
        onSubmit={login}
        className='flex flex-col items-center p-12 pb-6 rounded-md space-y-6 blackGradient'
      >
        <div className='flex max-w-xl w-full justify-between'>
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
        <div className='flex max-w-xl w-full justify-between'>
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
        <button
          type='submit'
          className='my-16 border border-primary p-2 transition-all rounded-sm bg-transparent hover:bg-primary text-primary hover:text-secondary'
        >
          Login
        </button>
        <p className='text-white'>
          not registered yet?{' '}
          <Link to='/register' className='text-primary hover:underline'>
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
