exports.generateSlots = (startTime, endTime, slotDuration) => {
  const slots = [];

  let [startHour, startMinute] = startTime.split(":").map(Number);

  let [endHour, endMinute] = endTime.split(":").map(Number);

  let start = new Date();
  start.setHours(startHour, startMinute, 0, 0);

  let end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  while (start < end) {
    slots.push(start.toTimeString().slice(0, 5));

    start = new Date(start.getTime() + slotDuration * 60000);
  }

  return slots;
};
