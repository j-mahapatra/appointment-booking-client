export default function SlotView({
  day,
  availableSlots,
  sectionOfDay,
}: {
  day: string;
  availableSlots: SlotType[] | undefined;
  sectionOfDay: string;
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

  const isDaySectionEmpty = () => {
    let result = true;
    getUniqueSlots().forEach((slot) => {
      if (getDaySection(slot.slot) === sectionOfDay) {
        result = false;
      }
    });
    return result;
  };

  return (
    <div className='flex flex-col items-center'>
      {getUniqueSlots()?.length > 0 && !isDaySectionEmpty() && (
        <>
          <p className='text-center mb-2 text-primary'>{day}</p>
          <div className='flex flex-wrap gap-x-2'>
            {getUniqueSlots()?.length ? (
              getUniqueSlots()?.map(
                (slot) =>
                  getDaySection(slot.slot) === sectionOfDay && (
                    <p
                      key={slot._id}
                      className='border border-primary p-2 text-center my-2'
                    >
                      {slot.slot}
                    </p>
                  )
              )
            ) : (
              <p>No time slots available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
