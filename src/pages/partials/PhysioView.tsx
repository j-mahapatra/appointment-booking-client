import { useState } from 'react';
import SlotSelect from '../../components/SlotSelect';

export default function PhysioView() {
  const [day, setDay] = useState<string>('Monday');

  return (
    <div className='flex flex-col w-full justify-center items-center text-white p-5'>
      <p className='text-left w-full'>
        Please select day and time slots according to your availability:
      </p>
      <div className='w-full my-5'>
        <label htmlFor='day' className='mr-5'>
          Select a day:
        </label>
        <select
          name='day'
          id='day'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className='bg-transparent outline-none'
        >
          <option defaultChecked value='monday' className='text-black'>
            Monday
          </option>
          <option value='tuesday' className='text-black'>
            Tuesday
          </option>
          <option value='wednesday' className='text-black'>
            Wednesday
          </option>
          <option value='thursday' className='text-black'>
            Thursday
          </option>
          <option value='friday' className='text-black'>
            Friday
          </option>
          <option value='saturday' className='text-black'>
            Saturday
          </option>
        </select>
      </div>
      <SlotSelect day={day} />
    </div>
  );
}
