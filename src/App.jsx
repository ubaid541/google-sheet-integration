import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Templates } from "./Components/templates/Templates";
// import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CircularProgress } from "@mui/material";

function App() {
  const GOOGLE_API = import.meta.env.VITE_GC_URL;
  const GOOGLE_API_KEY = import.meta.env.VITE_GC_API;
  const GS_ID = "13-bLObOmH58t8RrLsq3yGoXxBdRipoi1b9xE6pQvcvw";
  // const GS_ID = "15GZStyT_1PoR0F2bj-I46ZITgasB90UZYgk5J76D6_E";
  const SHEET_ID = "1252178713";
  // const RANGE = "Ubaid Ur Rehman!B10:I";
  const RANGE = "candidates!B2:C";
  const [allSheets, setallSheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [displaySingleSheetBtn, setdisplaySingleSheetBtn] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [candidateData, setCandidateData] = useState([]);

  console.log("allsheets:: ", allSheets);

  const handleOpenModel = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const fetchSheetData = async () => {
    setBtnLoading(true);
    try {
      const response = await axios.get(
        `${GOOGLE_API}/spreadsheets/${GS_ID}?key=${GOOGLE_API_KEY}`
      );

      console.log("reponse:: ", response);
      const sheetsData = response.data.sheets.map((sheet) => {
        const sheetId = sheet.properties.sheetId;
        const sheetTitle = sheet.properties.title;
        return { id: sheetId, title: sheetTitle };
      });
      setallSheets(sheetsData);
      setdisplaySingleSheetBtn(true);

      toast.success("Successfully fetched sheets.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setBtnLoading(false);

      console.log("Sheets:", sheetsData);
    } catch (error) {
      setBtnLoading(false);
      toast.error("Unable to fetch google sheet data.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error fetching sheets:", error);
    }
  };

  const fetchDataFromSheet = async () => {
    try {
      // const response = await axios.get(
      //   `${GOOGLE_API}/spreadsheets/${GS_ID}/values/${SHEET_ID}!${RANGE}?key=${GOOGLE_API_KEY}`
      // );
      // const response = await axios.get(
      //   `${GOOGLE_API}/spreadsheets/${GS_ID}/values/${SHEET_ID}!${RANGE}?key=${GOOGLE_API_KEY}`
      // );
      const response = await axios.get(
        `${GOOGLE_API}/spreadsheets/${GS_ID}/values/${RANGE}?key=${GOOGLE_API_KEY}`
      );

      console.log("single sheet response:: ", response);
      const data = response.data.values;

      const emails = data?.map((item) => item);

      console.log("email", emails);
      setCandidateData(emails);

      console.log("Data from Sheet:", data);
    } catch (error) {
      console.error("Error fetching data from sheet:", error);
      toast.error("Unable to fetch single sheet data.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Button
        className="border-1 rounded-2 p-4 font-bold bg-[#1a1a1a] text-white"
        onClick={fetchSheetData}
      >
        {!btnLoading ? <span>Fetch</span> : <CircularProgress />}
      </Button>
      {displaySingleSheetBtn && (
        <>
          <Button
            className=" ml-3 border-1 rounded-2 p-4 font-bold bg-[#1a1a1a] text-white"
            onClick={fetchDataFromSheet}
          >
            Fetch Single Sheet
          </Button>

          <Button
            className=" ml-3 border-1 rounded-2 p-4 font-bold bg-[#1a1a1a] text-white"
            onClick={handleOpenModel}
          >
            Select Email Template
          </Button>
        </>
      )}

      {open && <Templates open={open} handleOpenModel={handleOpenModel} />}
    </>
  );
}

export default App;
