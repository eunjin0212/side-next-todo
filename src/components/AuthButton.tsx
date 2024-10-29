'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/auth/helpers';
import { useGet } from '@/hooks/useApi';
import { apiPost } from '@/utils/api';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => (
  <button
    className="relative h-7 py-1 px-2 overflow-hidden text-lg leading-tight font-semibold rounded-lg text-positive after:border after:border-positive after:rounded-lg before:absolute before:top-0 before:left-0 before:w-0 hover:before:w-full before:h-full hover:before:bg-positive z-[1] before:-z-[1] hover:text-white after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:-z-[2] before:transition-all"
    onClick={onClick}
  >
    {label}
  </button>
);

export default function AuthButton() {
  const session = useSession();
  const [shouldFetch, setShouldFetch] = useState(!!session.data?.user?.email);
  const { data } = useGet(shouldFetch ? `notion/user?email=${session.data?.user?.email}` : '');

  const handleAuth = async () => {
    if (!session.data?.user?.email) {
      // login
      await signIn();
      setShouldFetch(true);
      return;
    }
    // logout
    await signOut().finally(() => {
      setShouldFetch(false);
    });
    await signIn();
  };

  useEffect(() => {
    if (!data && shouldFetch) {
      apiPost('notion/user', session.data?.user)
      return
    }

    return () => { }
  }, [shouldFetch]);

  return (
    <Button
      onClick={handleAuth}
      label={session.data?.user?.email ? 'SIGN OUT' : 'SIGN IN'}
    />
  );
}
