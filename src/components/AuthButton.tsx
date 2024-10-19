'use client';

import { useSession } from 'next-auth/react';

import { signIn, signOut } from '@/auth/helpers';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => (
  <button
    className='relative px-2 overflow-hidden text-lg font-semibold rounded-lg text-positive after:border after:border-positive after:rounded-lg before:absolute before:top-0 before:left-0 before:w-0 hover:before:w-full before:h-full hover:before:bg-positive z-[1] before:-z-[1] hover:text-white after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:-z-[2] before:transition-all'
    onClick={() => onClick()}
  >
    {label}
  </button>
);

export default function AuthButton() {
  const { data } = useSession();

  const handleAuth = async () => {
    if (!data?.user) {
      // login
      await signIn();
      return;
    }

    // logout
    await signOut();
    await signIn();
  };

  return <Button
    onClick={handleAuth}
    label={data?.user ? 'SIGN OUT' : 'SIGN IN'}
  />;
}
