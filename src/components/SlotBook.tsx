import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from './Modal';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [slotId, setSlotId] = useState<string>('');
  const [slot, setSlot] = useState<string>('');

  useEffect(() => {
    const current = physioData.filter(
      (physio) => physio.email === selectedPhysio
    )?.[0];
    setCurrentPhysio(current);
  }, [physioData, selectedPhysio]);

  const bookTimeSlot = async (remarks: string) => {
    if (!remarks) {
      toast.error('Enter some details for the booking.');
      return;
    }

    await axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/api/slots/book`, {
        slotId,
        remarks,
      })
      .then(() => {
        setBookedSlots((prev) => [...prev, slot]);
        toast.success('Appointment slot booked.');
        setIsModalOpen(false);
      })
      .catch(() => {
        toast.error('Appointment booking failed');
      });
  };

  const openModal = (slotId: string, slot: string) => {
    setSlot(slot);
    setSlotId(slotId);
    setIsModalOpen(true);
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

  const hasBookedSlots = () => {
    let result = false;
    currentPhysio?.free_slots
      ?.filter(
        (slot: SlotType) =>
          slot.day === selectedDay &&
          getDaySection(slot.slot) === sectionOfDay &&
          (bookedSlots?.includes(slot.slot) || slot.isBooked)
      )
      ?.forEach((slot) => {
        if (slot.isBooked) {
          result = true;
        }
      });
    return result;
  };

  const hasSlotsToBeBooked = () => {
    let result = false;
    currentPhysio?.free_slots
      ?.filter(
        (slot) =>
          slot.day === selectedDay && getDaySection(slot.slot) === sectionOfDay
      )
      ?.forEach((slot) => {
        if (!slot.isBooked) {
          result = true;
        }
      });
    return result;
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          bookTimeSlot={bookTimeSlot}
        />
      )}
      {currentPhysio && selectedDay && sectionOfDay && (
        <div className='flex flex-col w-full items-center justify-center my-5'>
          {hasSlotsToBeBooked() ? (
            <>
              <p className='text-center'>Click on a slot to book:</p>
              <p className='text-center text-xs'>
                (Grayed out slots are already booked)
              </p>
            </>
          ) : (
            <p className='text-center mt-12'>
              No slots available during this time.
            </p>
          )}
          <div className='my-8'>
            {currentPhysio?.free_slots
              ?.filter(
                (slot) =>
                  slot.day === selectedDay &&
                  getDaySection(slot.slot) === sectionOfDay
              )
              ?.map((slot: SlotType) => (
                <button
                  key={slot._id}
                  onClick={() => openModal(slot._id, slot.slot)}
                  disabled={bookedSlots?.includes(slot.slot) || slot.isBooked}
                  className={`flex m-2 justify-center rounded-md border border-primary p-2 w-24 ${
                    (bookedSlots?.includes(slot.slot) || slot.isBooked) &&
                    'bg-gray-700'
                  }`}
                >
                  {slot.slot}
                </button>
              ))}
          </div>
          {hasBookedSlots() && (
            <div className='flex flex-col items-center my-8 w-full'>
              {currentPhysio && selectedDay && sectionOfDay ? (
                hasBookedSlots() && (
                  <p className='text-center mb-5'>Booked Slots:</p>
                )
              ) : (
                <p>
                  Please select a physiotherapist, day and time of day to view
                  booked slots.
                </p>
              )}
              {currentPhysio?.free_slots
                ?.filter(
                  (slot: SlotType) =>
                    slot.day === selectedDay &&
                    getDaySection(slot.slot) === sectionOfDay &&
                    (bookedSlots?.includes(slot.slot) || slot.isBooked)
                )
                ?.map(
                  (slot: SlotType) =>
                    (bookedSlots?.includes(slot.slot) || slot.isBooked) && (
                      <div
                        key={slot._id}
                        className='flex w-full max-w-2xl justify-center'
                      >
                        <p className='flex w-fit m-2 justify-center text-primary p-2'>
                          {slot.slot}
                        </p>
                        <p className='flex w-fit m-2 justify-center text-primary p-2'>
                          {slot.remarks}
                        </p>
                      </div>
                    )
                )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
