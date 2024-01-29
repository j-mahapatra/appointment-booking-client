import { useEffect, useState } from 'react';
import axios from 'axios';

import { days, sectionsOfDay } from '../../lib/constants';
import SlotBook from '../../components/SlotBook';

export default function SalesView() {
  const [physioData, setPhysioData] = useState<UserType[]>([]);
  const [selectedPhysio, setSelectedPhysio] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [daySection, setDaySection] = useState<string>('');

  useEffect(() => {
    const getPhysioData = async () => {
      const users = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/user/get-physios`
      );
      setPhysioData(users.data.data);
    };
    getPhysioData();
  }, []);

  return (
    <div className='flex flex-col space-y-5 w-full justify-center items-center text-white p-5'>
      <div className='flex flex-col sm:flex-row items-center space-x-2'>
        <select
          name='physio'
          id='physio'
          value={selectedPhysio}
          onChange={(e) => setSelectedPhysio(e.target.value)}
          className='bg-transparent outline-none'
        >
          <option disabled={true} value='' className='text-gray-700'>
            Select a Physiotherapist
          </option>
          {physioData?.map((physio) => (
            <option
              key={physio._id}
              value={physio.email}
              className='text-black'
            >
              {physio.email}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center space-x-2'>
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
      <div className='flex justify-center space-x-2'>
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
      <SlotBook
        physioData={physioData}
        selectedPhysio={selectedPhysio}
        selectedDay={day}
        sectionOfDay={daySection}
      />
    </div>
  );
}
