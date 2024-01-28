import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        success: {
          style: {
            border: '1px solid #52c1da',
            padding: '16px',
            color: '#52c1da',
            textAlign: 'center',
            backgroundColor: '#050505',
          },
          iconTheme: {
            primary: '#52c1da',
            secondary: '#FFFAEE',
          },
        },
        error: {
          style: {
            border: '1px solid #52c1da',
            padding: '16px',
            color: '#52c1da',
            textAlign: 'center',
            backgroundColor: '#050505',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        },
      }}
    />
  );
}
