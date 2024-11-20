import { auth } from "/auth"

const Home = async () => {
  const session = await auth()

  if (!session?.user) return (
    <section className='w-screen h-screen flex flex-col justify-center items-center pb-80'>
      <div className="lock-icon relative w-32 h-28 bg-yellow-500 rounded-3xl animate-shake mb-10">
        <div className="absolute top-[-64px] left-1/2 transform -translate-x-1/2 w-[4.5rem] h-14 bg-white rounded-t-full border-[12px] border-neutral-300"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-yellow-800 rounded-lg"></div>
      </div>
      <strong className='text-5xl'>Sorry, You need to log in</strong>
    </section>
  )

  return (
    <section className='flex flex-col items-center justify-center py-10'>
      <h2 className='text-2xl font-bold text-success pb-6'>✅ Check your TODO</h2>
      <ol className='border rounded-lg p-4 w-2/4'>
        <li>todo</li>
        <li>todo</li>
        <li>todo</li>
        <li>todo</li>
      </ol>
    </section>
  );
}

export default Home
