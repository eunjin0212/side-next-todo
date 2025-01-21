'use client';

import { ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { apiPost } from '../utils/api';
import Checkbox from '../components/ui/Checkbox';

const Home = () => {
  const { data: session } = useSession();

  const [newTodo, setNewTodo] = useState('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [todoList, setTodoList] = useState([]);

  const handleList = async () => {
    try {
      // const res = await apiPost('notion/list', session?.user?.id);
      // setTodoList(res)
    } catch (error) {
      //
    }
  };

  const handleNewTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await apiPost('notion/list', {
        parentId: session?.user?.id,
        text: newTodo,
      });
      setNewTodo('')
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    handleList();
  }, [session]);

  if (!session?.user)
    return (
      <section className='w-screen h-screen flex flex-col justify-center items-center pb-80'>
        <div className='lock-icon relative w-32 h-28 bg-yellow-500 rounded-3xl animate-shake mb-10'>
          <div className='absolute top-[-64px] left-1/2 transform -translate-x-1/2 w-[4.5rem] h-14 bg-white rounded-t-full border-[12px] border-neutral-300'></div>
          <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-yellow-800 rounded-lg'></div>
        </div>
        <strong className='text-5xl'>Sorry, You need to log in</strong>
      </section>
    );

  return (
    <section className='flex flex-col items-center justify-center py-10'>
      <h2 className='text-2xl font-bold text-success pb-6'>
        ✅ Check your TODO
      </h2>
      <form
        onSubmit={handleSubmit}
        className='mb-4 w-2/4'
      >
        <label id='text'>
          <input
            name='text'
            placeholder='Enter your work!'
            value={newTodo}
            onChange={handleNewTodo}
            className='border border-positive px-2 py-1 rounded w-full focus-within:outline-none'
          />
        </label>
      </form>
      <ol className='border rounded-lg p-4 w-2/4'>
        {todoList.map((todo, idx) => (
          <li key={`${todo}_${idx}`}>
            <Checkbox
              label={todo}
              value={todo}
              checked={checkedList.includes(todo)}
              onChange={(val) =>
                setCheckedList((prev) => {
                  val ? prev.push(todo) : prev.filter((list) => list !== todo);
                  return prev;
                })
              }
            />
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Home;
