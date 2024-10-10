export const groupByArea = (shifts) => {
  const groupedShifts = {};
  shifts.forEach((shift) => {
    const area = shift.area;
    if (!groupedShifts[area]) {
      groupedShifts[area] = [];
    }
    groupedShifts[area].push(shift);
  });
  return groupedShifts;
};
export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const formattedDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(formattedDate);
};
export const groupShiftsByDate = (shifts) => {
  const groupedShifts = {};

  shifts?.forEach((shift) => {
    const date = new Date(shift.startTime);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (!groupedShifts[formattedDate]) {
      groupedShifts[formattedDate] = [];
    }

    groupedShifts[formattedDate].push(shift);
  });
  return groupedShifts;
};
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  return formattedTime;
};
