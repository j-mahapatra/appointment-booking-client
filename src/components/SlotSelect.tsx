import { useEffect, useState } from 'react';
import axios from 'axios';

import { slots } from '../lib/constants';
import toast from 'react-hot-toast';

type SlotType = {
  _id: string;
  slot: string;
  day: string;
  isBooked: boolean;
};

function calcPreviousSlot(slot: string): string {
  const hours = parseInt(slot.substring(0, 2));
  const minutes = parseInt(slot.substring(3));
  let prevSlotHours = hours;
  let prevSlotMinutes = minutes - 15;
  if (prevSlotMinutes === -15) {
    prevSlotMinutes = 45;
    prevSlotHours = prevSlotHours - 1;
  }
  let prevSlot = '';
  if (prevSlotHours < 10) {
    prevSlot += '0' + prevSlotHours;
  } else {
    prevSlot += '' + prevSlotHours;
  }
  prevSlot += ':';
  if (prevSlotMinutes === 0) {
    prevSlot += '00';
  } else {
    prevSlot += '' + prevSlotMinutes;
  }

  return prevSlot;
}

function calcNextSlot(slot: string): string {
  const hours = parseInt(slot.substring(0, 2));
  const minutes = parseInt(slot.substring(3));
  let nextSlotHours = hours;
  let nextSlotMinutes = minutes + 15;
  if (nextSlotMinutes === 60) {
    nextSlotMinutes = 0;
    nextSlotHours = nextSlotHours + 1;
  }
  let nextSlot = '';
  if (nextSlotHours < 10) {
    nextSlot += '0' + nextSlotHours;
  } else {
    nextSlot += '' + nextSlotHours;
  }
  nextSlot += ':';
  if (nextSlotMinutes === 0) {
    nextSlot += '00';
  } else {
    nextSlot += '' + nextSlotMinutes;
  }

  return nextSlot;
}

export default function SlotSelect({ day }: { day: string }) {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    const getSlots = async () => {
      const slots = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/slots/get-slots`
      );

      setSelectedSlots(
        slots.data.free_slots
          .filter((slot: SlotType) => slot.day === day)
          .map((slot: SlotType) => slot.slot)
      );
    };
    getSlots();
  }, [day]);

  const isSlotAvailable = (slot: string) => {
    const prevSlot = calcPreviousSlot(slot);
    const prevOfPrevSlot = calcPreviousSlot(prevSlot);
    const nextSlot = calcNextSlot(slot);
    const nextOfNextSlot = calcNextSlot(nextSlot);

    if (
      selectedSlots.includes(prevSlot) ||
      selectedSlots.includes(prevOfPrevSlot) ||
      selectedSlots.includes(nextSlot) ||
      selectedSlots.includes(nextOfNextSlot)
    ) {
      return false;
    }
    return true;
  };

  const handleSlotSelect = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots((prev) => [...prev.filter((sl) => sl != slot)]);
    } else {
      setSelectedSlots((prev) => [...prev, slot]);
    }
  };

  const saveSelectedSlots = async () => {
    if (selectedSlots.length === 0) {
      return toast.error('Please choose your time slots');
    }
    await axios
      .put(`${import.meta.env.VITE_SERVER_URL}/api/slots/create`, {
        slots: selectedSlots,
        day,
      })
      .then(() => {
        toast.success('Selections saved');
      })
      .catch(() => {
        toast.error('Failed to save selections');
      });
  };

  return (
    <div className='flex flex-col w-full px-2'>
      <div className='flex flex-wrap w-full justify-center'>
        {slots.map((slot) => (
          <button
            key={slot}
            disabled={!isSlotAvailable(slot)}
            onClick={() => handleSlotSelect(slot)}
            className={`flex m-2 justify-center basis-1/4 sm:basis-1/12 rounded-md border border-primary p-2 ${
              selectedSlots.includes(slot) && 'bg-primary text-secondary'
            } ${!isSlotAvailable(slot) && 'bg-gray-700'}`}
          >
            {slot}
          </button>
        ))}
      </div>
      <div className='flex my-5 flex-col'>
        {selectedSlots.length > 0 && (
          <p className='mb-5'>Selected Time Slots:</p>
        )}
        {selectedSlots.map((slot) => (
          <p key={slot}>
            {slot + ' to ' + calcNextSlot(calcNextSlot(calcNextSlot(slot)))}
          </p>
        ))}
      </div>
      <div className='flex w-full justify-center space-x-5'>
        <button
          onClick={() => setSelectedSlots([])}
          className='bg-primary p-2 rounded-md sm:w-fit text-secondary'
        >
          Clear Selections
        </button>
        <button
          onClick={saveSelectedSlots}
          className='bg-primary p-2 rounded-md sm:w-fit text-secondary'
        >
          Save Selections
        </button>
      </div>
    </div>
  );
}
