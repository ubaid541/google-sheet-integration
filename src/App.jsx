import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const GOOGLE_API = import.meta.env.VITE_GC_URL;
  const GOOGLE_API_KEY = import.meta.env.VITE_GC_API;
  const GS_ID = "13-bLObOmH58t8RrLsq3yGoXxBdRipoi1b9xE6pQvcvw";
  const SHEET_ID = "1252178713";
  const RANGE = "Ubaid Ur Rehman!B10:I";
  const [allSheets, setallSheets] = useState([]);
  const [displaySingleSheetBtn, setdisplaySingleSheetBtn] = useState(false);

  console.log("allsheets:: ", allSheets);

  const fetchSheetData = async () => {
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

      console.log("Sheets:", sheetsData);
    } catch (error) {
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
      console.log("Data from Sheet:", data);
    } catch (error) {
      console.error("Error fetching data from sheet:", error);
    }
  };

  return (
    <>
      <button onClick={fetchSheetData}>Fetch</button>
      {displaySingleSheetBtn && (
        <button onClick={fetchDataFromSheet}>Fetch Single Sheet</button>
      )}
    </>
  );
}

export default App;
