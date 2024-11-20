import type { Dispatch, SetStateAction } from 'react';

interface CheckboxProps {
  value: string;
  checked: boolean;
  label: string;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const Checkbox = ({ value, checked, label, onChange }: CheckboxProps) => {
  return (
    <label className='cursor-pointer inline-flex items-center'>
      <span
        className={[
          'inline-block relative rounded-sm mr-2 w-4 h-4 before:absolute before:w-full before:h-full before:border before:rounded-sm',
          checked
            ? 'bg-positive before:border-positive'
            : 'bg-white before:border-gray-500',
        ].join(' ')}
      ></span>
      <input
        onChange={(e) => onChange(e.target.checked)}
        type='checkbox'
        hidden
        value={value}
        checked={checked}
      />
      {label}
    </label>
  );
};

export default Checkbox;
