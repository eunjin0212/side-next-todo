import { auth } from "/auth"
import Link from 'next/link';
import AuthButton from '@/components/AuthButton';

const Header = async () => {
  const session = await auth()

  return (
    <header>
      <nav className='flex items-center justify-between py-3 row px-9'>
        <Link
          href={'/'}
          className='text-3xl font-extrabold text-positive'
        >
          NEXT TODO
        </Link>
        <div>
          <strong className='mx-2'>{session?.user?.name || ''}</strong>
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
