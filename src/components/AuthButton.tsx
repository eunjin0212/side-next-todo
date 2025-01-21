'use client';

import { useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { apiGet, apiPost } from '@/utils/api';

const AuthButton = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    apiGet(`notion/user?email=${session.user.email}`).then(async (res) => {
      if (res?.email) return;

      apiPost('notion/user', session.user);
    });
  }, [session?.user]);

  const handleAuth = async () => {
    if (!session?.user?.email) {
      await signIn('google', { redirectTo: '/' });
      return;
    }

    await signOut();
  };

  return (
    <button
      className='relative h-7 py-1 px-2 overflow-hidden text-lg leading-tight font-semibold rounded-lg text-positive after:border after:border-positive after:rounded-lg before:absolute before:top-0 before:left-0 before:w-0 hover:before:w-full before:h-full hover:before:bg-positive z-[1] before:-z-[1] hover:text-white after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:-z-[2] before:transition-all'
      onClick={handleAuth}
    >
      {session?.user?.email ? 'SIGN OUT' : 'SIGN IN'}
    </button>
  );
};

export default AuthButton;
