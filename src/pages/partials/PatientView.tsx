import axios from 'axios';
import { useEffect, useState } from 'react';

import { days, sectionsOfDay } from '../../lib/constants';
import SlotView from '../../components/SlotView';

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
            Select time of day
          </option>
          {sectionsOfDay.map((section) => (
            <option
              key={section}
              value={section.toLowerCase()}
              className='text-black'
            >
              {section}
            </option>
          ))}
        </select>
      </div>
      {daySection && (
        <>
          <p className='text-center'>
            Doctors are available at the following time slots:
          </p>
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
        </>
      )}
    </div>
  );
}
