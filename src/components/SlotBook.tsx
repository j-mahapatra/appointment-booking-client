import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SlotBook({
  physioData,
  selectedPhysio,
  selectedDay,
  sectionOfDay,
}: {
  physioData: UserType[];
  selectedPhysio: string;
  selectedDay: string;
  sectionOfDay: string;
}) {
  const [currentPhysio, setCurrentPhysio] = useState<UserType>();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const current = physioData.filter(
      (physio) => physio.email === selectedPhysio
    )?.[0];
    setCurrentPhysio(current);
  }, [physioData, selectedPhysio]);

  const bookTimeSlot = async (slotId: string, slot: string) => {
    await axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/api/slots/book`, {
        slotId,
      })
      .then(() => {
        setBookedSlots((prev) => [...prev, slot]);
        toast.success('Appointment slot booked.');
      })
      .catch(() => {
        toast.error('Appointment booking failed');
      });
  };

  const getDaySection = (slot: string): string => {
    const hours = parseInt(slot.substring(0, 2));

    if (hours < 12) {
      return 'morning';
    } else if (hours < 16) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };

  return (
    <div className='flex flex-col w-full items-center justify-center my-5'>
      <p className='text-center'>Click on a slot to book:</p>
      <div>
        {currentPhysio?.free_slots?.map(
          (slot: SlotType) =>
            slot.day === selectedDay &&
            getDaySection(slot.slot) === sectionOfDay && (
              <button
                key={slot._id}
                onClick={() => bookTimeSlot(slot._id, slot.slot)}
                disabled={bookedSlots?.includes(slot.slot) || slot.isBooked}
                className={`flex m-2 justify-center rounded-md border border-primary p-2 w-24 ${
                  (bookedSlots?.includes(slot.slot) || slot.isBooked) &&
                  'bg-gray-700'
                }`}
              >
                {slot.slot}
              </button>
            )
        )}
      </div>
    </div>
  );
}
