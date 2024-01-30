import { useState } from 'react';

export default function Modal({
  setIsModalOpen,
  bookTimeSlot,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookTimeSlot: (remarks: string) => void;
}) {
  const [remarks, setRemarks] = useState<string>('');

  return (
    <div className='absolute z-5 flex justify-center items-center h-screen w-full text-white bg-secondary'>
      <div className='flex flex-col space-y-3'>
        <p>Enter details of this booking:</p>
        <textarea
          name='remarks'
          id='remarks'
          cols={30}
          rows={5}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className='bg-transparent rounded-sm border outline-none border-slate-800'
        />
        <div className='flex justify-end space-x-2'>
          <button
            onClick={() => setIsModalOpen(false)}
            className='border border-primary rounded-md p-2'
          >
            Cancel
          </button>
          <button
            onClick={() => bookTimeSlot(remarks)}
            className='border border-primary rounded-md p-2 bg-primary text-secondary'
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
}
