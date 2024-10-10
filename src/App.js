import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/core/Modal/Modal";
import { API_BASE_URL } from "./api";
import axios from "axios";

function App() {
  const tabsConfig = [
    {
      key: 1,
      name: "My shifts",
    },
    {
      key: 2,
      name: "Available shifts",
    },
  ];
  const SHIFT_STATUS = {
    AVAILABLE_SHIFTS: "availableShifts",
    MY_SHIFTS: "myShifts",
  };

  const [currentTab, setCurrentTab] = useState(tabsConfig[0].key);
  const [myShifts, setMyShifts] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);
  const url =
    currentTab === 1 ? `${API_BASE_URL}/shifts` : `${API_BASE_URL}/shifts`;
  const shiftStatus =
    currentTab === 1 ? SHIFT_STATUS.MY_SHIFTS : SHIFT_STATUS.AVAILABLE_SHIFTS;

  const [loadingBookRequest, setLoadingBookRequest] = useState(false);
  const [loadingCancelRequest, setLoadingCancelRequest] = useState(false);

  const fetchShifts = async (url, shiftStatus) => {
    try {
      //all the shifts
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const shifts = await response.json();
      setAvailableShifts(shifts);
      setMyShifts(shifts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchShifts(url, shiftStatus);
  }, []);

  const sendBookRequest = async (shiftId) => {
    try {
      setLoadingBookRequest({ [shiftId]: true });

      const response = await axios.post(
        `${API_BASE_URL}/shifts/${shiftId}/book`
      );
      if (response) {
        setLoadingBookRequest({ [shiftId]: false });
      }
      console.log("booked", response);

      // Update shifts after successful booking
      fetchShifts(url, shiftStatus);
    } catch (error) {
      console.log("action can't be performed", error);
    }
  };

  const sendCancelRequest = async (shiftId) => {
    try {
      setLoadingCancelRequest({ [shiftId]: true });

      const response = await axios.post(
        `${API_BASE_URL}/shifts/${shiftId}/cancel`
      );

      if (response) {
        setLoadingCancelRequest({ [shiftId]: false });
      }
      console.log("cancelled", response);

      fetchShifts(url, shiftStatus);
    } catch (error) {
      console.log("action can't be performed", error);
    }
  };

  return (
    <div className="py-10 flex  flex-col gap-10 items-center justify-center">
      <div className="flex justify-between gap-6">
        {tabsConfig.map((tab) => (
          <h1
            onClick={() => setCurrentTab(tab.key)}
            className={`${
              currentTab === tab?.key ? "text-blue-600" : "text-blue-400"
            } text-2xl cursor-pointer`}
          >
            {tab.name}
          </h1>
        ))}
      </div>
      <Modal
        shifts={currentTab === 1 ? myShifts : availableShifts}
        sendBookRequest={sendBookRequest}
        loadingBookRequest={loadingBookRequest}
        loadingCancelRequest={loadingCancelRequest}
        sendCancelRequest={sendCancelRequest}
      />
    </div>
  );
}

export default App;
