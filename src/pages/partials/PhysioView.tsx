import { useState } from 'react';

import { days } from '../../lib/constants';
import SlotSelect from '../../components/SlotSelect';

export default function PhysioView() {
  const [day, setDay] = useState<string>('');

  return (
    <div className='flex flex-col w-full justify-center items-center text-white p-5 px-16'>
      <p className='text-left w-full'>
        Please select day and time slots according to your availability:
      </p>
      <div className='w-full my-5'>
        <select
          name='day'
          id='day'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className='bg-transparent outline-none'
        >
          <option disabled={true} value='' className='text-gray-700'>
            Select a day
          </option>
          {days.map((day) => (
            <option key={day} value={day.toLowerCase()} className='text-black'>
              {day}
            </option>
          ))}
        </select>
      </div>
      <SlotSelect day={day} />
    </div>
  );
}
