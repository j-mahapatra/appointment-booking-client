export default function SlotView({
  day,
  availableSlots,
}: {
  day: string;
  availableSlots: SlotType[] | undefined;
}) {
  const getUniqueSlots = (): SlotType[] => {
    const set = new Set<string>();
    const uniqueSlots: SlotType[] = [];
    availableSlots?.forEach((slot) => {
      if (!set.has(slot.slot)) {
        uniqueSlots.push(slot);
        set.add(slot.slot);
      }
    });
    uniqueSlots.sort((a, b) => a.slot.localeCompare(b.slot));
    return uniqueSlots;
  };

  return (
    <div className='flex flex-col items-center'>
      <p className='text-center mb-2 text-primary'>{day}</p>
      <div className='flex flex-wrap gap-x-2'>
        {getUniqueSlots()?.length ? (
          getUniqueSlots()?.map((slot) => (
            <p
              key={slot._id}
              className='border border-primary p-2 text-center my-2'
            >
              {slot.slot}
            </p>
          ))
        ) : (
          <p>No time slots available</p>
        )}
      </div>
    </div>
  );
}
