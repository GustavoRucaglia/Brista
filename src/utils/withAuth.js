import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
      if (!token) {
        Router.replace('/login');
      }
    }, [token]);

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;