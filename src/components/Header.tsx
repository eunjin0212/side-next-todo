import Link from 'next/link';
import AuthButton from '@/components/AuthButton';
import { auth } from "/auth"

const Header = async () => {
  const session = await auth()

  return (
    <header>
      <nav className='flex items-center justify-between py-3 row px-9'>
        <Link
          href={'/'}
          className='text-2xl font-extrabold text-positive'
        >
          NEXT TODO
        </Link>
        <div>
          <span className='mr-2'>
            {session?.user?.name || ''}
          </span>
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
