"use client"

import Link from 'next/link';
import AuthButton from '@/app/AuthButton.server';

const Header = () => {
  return (
    <header>
      <nav className='flex row justify-between py-3 px-9'>
        <Link
          href={'/'}
          className='font-extrabold text-2xl text-positive'
        >
          NEXT TODO
        </Link>
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
