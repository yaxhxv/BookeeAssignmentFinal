import React, { useState } from "react";
import Button from "../../core/Button";
import {
  formatDate,
  formatTime,
  groupByArea,
  groupShiftsByDate,
} from "../../../utils";

function Modal({
  shifts,
  sendBookRequest,
  sendCancelRequest,
  loadingBookRequest,
  loadingCancelRequest,
}) {
  const groupedShiftsByArea = groupByArea(shifts);

  const [selectedArea, setSelectedArea] = useState("Helsinki");

  const shiftsOfSelectedArea = groupedShiftsByArea[selectedArea];

  const groupedShiftsByDate = groupShiftsByDate(shiftsOfSelectedArea);

  const checkOverlap = (shiftId, shifts) => {
    const currentShift = shifts.find((shift) => shift.id === shiftId);

    if (currentShift) {
      const overlappingShift = shifts.find(
        (shift) =>
          shift.id !== shiftId &&
          shift.booked &&
          currentShift.startTime < shift.endTime &&
          currentShift.endTime > shift.startTime
      );

      return !!overlappingShift;
    }

    return false;
  };

  const isShiftInProgress = (shift) => {
    const now = new Date().getTime();
    return shift.startTime <= now && now <= shift.endTime;
  };

  return (
    <div className=" bg-white w-[600px]  border border-gray-200 shadow-md rounded-md">
      {groupedShiftsByArea && (
        <div className="flex  justify-around p-4 border-b border-gray-200 items-center  text-blue-500 font-bold">
          {Object.entries(groupedShiftsByArea).map(([area, items]) => (
            <div
              onClick={() => setSelectedArea(area)}
              className={`${
                selectedArea === area ? "text-blue-600" : "text-blue-400"
              } cursor-pointer`}
            >{`${area} (${items.length})`}</div>
          ))}
        </div>
      )}
      {groupedShiftsByDate && (
        <div className="flex flex-col justify-center items-center  text-blue-500 font-bold">
          {!shifts.length && "No data available"}
          {groupedShiftsByDate &&
            Object.entries(groupedShiftsByDate).map(([date, items]) => (
              <>
                <div
                  key={date}
                  className="flex gap-2 w-[600px] px-4 bg-blue-100 rounded-lg items-end p-2 border-b border-gray-200"
                >
                  <div className="font-bold">{formatDate(date)}</div>
                  <div className="text-xs font-normal text-blue-400 ">{`${items.length} shifts`}</div>
                </div>
                <div>
                  {items.map((item) => (
                    <div className="p-3  items-center justify-between flex border-b border-gray-200 w-[600px]">
                      <div className="font-medium text-blue-500">{`${formatTime(
                        item.startTime
                      )} - ${formatTime(item.endTime)}`}</div>
                      <Button
                        showSpinner={
                          loadingBookRequest[item?.id] ||
                          loadingCancelRequest[item?.id]
                        }
                        isDisabled={
                          (item.booked && checkOverlap(item.id, shifts)) ||
                          (item.booked && isShiftInProgress(item))
                        }
                        label={`${item.booked === false ? "Book" : "Cancel"}`}
                        onClick={() => {
                          item.booked === false
                            ? sendBookRequest(item?.id)
                            : sendCancelRequest(item?.id);
                        }}
                        variant={`${item.booked === false ? "green" : "pink"}`}
                      />
                    </div>
                  ))}
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
}

export default Modal;
