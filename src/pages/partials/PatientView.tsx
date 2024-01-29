import axios from 'axios';
import { useEffect, useState } from 'react';
import SlotView from '../../components/SlotView';
import { days } from '../../lib/constants';

export default function PatientView() {
  const [slots, setSlots] = useState<SlotType[]>();
  const [daySection, setDaySection] = useState<string>('');

  useEffect(() => {
    const getAllSlots = async () => {
      const allSlots = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/slots/get-all-slots`
      );
      setSlots(allSlots.data.slots);
    };
    getAllSlots();
  }, []);

  return (
    <div className='flex flex-col w-full justify-center items-center text-white p-5'>
      <div className='flex justify-center space-x-2 mb-5'>
        <select
          name='day'
          id='day'
          value={daySection}
          onChange={(e) => setDaySection(e.target.value)}
          className='bg-transparent outline-none'
        >
          <option disabled={true} value='' className='text-gray-700'>
            Select section of day
          </option>
          <option value='morning' className='text-black'>
            Morning
          </option>
          <option value='afternoon' className='text-black'>
            Afternoon
          </option>
          <option value='evening' className='text-black'>
            Evening
          </option>
        </select>
      </div>
      <p className='text-center'>You can choose to get an appointment at:</p>
      <div className='flex w-full flex-col my-8 space-y-10'>
        {days.map((day) => (
          <SlotView
            key={day}
            day={day}
            availableSlots={slots?.filter(
              (slot) => slot.day === day.toLowerCase()
            )}
            sectionOfDay={daySection}
          />
        ))}
      </div>
    </div>
  );
}
