"use client"

import Link from 'next/link';
import AuthButton from '@/components/AuthButton';

const Header = () => {
  return (
    <header>
      <nav className='flex items-center justify-between py-3 row px-9'>
        <Link
          href={'/'}
          className='text-2xl font-extrabold text-positive'
        >
          NEXT TODO
        </Link>
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
