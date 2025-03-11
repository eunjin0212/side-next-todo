import type { Dispatch, SetStateAction } from 'react';
import type { TodoList } from '/src/app/api/notion/list/route';

interface CheckboxProps extends TodoList {
  onChange: Dispatch<SetStateAction<boolean>>;
}

const Checkbox = ({ status, todo, onChange }: CheckboxProps) => {
  return (
    <label className='cursor-pointer inline-flex items-center'>
      <span
        className={[
          'inline-block relative rounded-sm mr-2 w-4 h-4 before:absolute before:w-full before:h-full before:border before:rounded-sm',
          status?.label === 'done'
            ? 'bg-center bg-no-repeat bg-[url("/assets/checkbox_icon.svg")] bg-positive before:border-positive'
            : 'bg-white before:border-gray-500',
        ].join(' ')}
      ></span>
      <input
        onChange={(e) => onChange(e.target.checked)}
        type='checkbox'
        hidden
        value={status.label}
        checked={status.label === 'done'}
      />
      {
        status.label !== 'done'
          ? <span>{todo}</span>
          : <s>{todo}</s>
      }
    </label>
  );
};

export default Checkbox;
