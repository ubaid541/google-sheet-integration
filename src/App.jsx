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
import { useStateContext } from "./context/ContextProvider";

function App() {
  const { selectedTemplate, setSelectedTemplate } = useStateContext();
  console.log("selected template:: ", selectedTemplate);

  const GOOGLE_API = import.meta.env.VITE_GC_URL;
  const GOOGLE_API_KEY = import.meta.env.VITE_GC_API;
  const GS_ID = "13-bLObOmH58t8RrLsq3yGoXxBdRipoi1b9xE6pQvcvw";
  // const GS_ID = "1IBM-LSQoaQwbjateHm2SpOQEA5xkhRY43al1cBWVwD8";
  const SHEET_ID = "1252178713";
  // const RANGE = "Ubaid Ur Rehman!B10:I";
  const RANGE = "candidates!B2:F";
  // const RANGE = "PHP Laravel!B2:H";
  const [allSheets, setallSheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [displaySingleSheetBtn, setdisplaySingleSheetBtn] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [sendingBtn, setSendingBtn] = useState(false);
  const [candidateData, setCandidateData] = useState([]);

  console.log("allsheets:: ", allSheets);

  const SendEmail = async (e) => {
    e.preventDefault();
    setSendingBtn(true);

    const names = candidateData?.map((item) => item[0]);
    const positions = candidateData?.map((item) => item[2]);
    const emails = candidateData?.map((item) => item[1]);

    const emailData = [];

    for (let i = 0; i < names.length; i++) {
      const splitName = selectedTemplate?.candidateName.split("");
      const splitPosition = selectedTemplate?.subject.split("");
      const splitMessage = selectedTemplate?.body.split("");

      splitName.splice(
        splitName.indexOf("["),
        splitName.indexOf("]") + 1,
        names[i]
      );
      splitPosition.splice(
        splitPosition.indexOf("["),
        splitPosition.indexOf("]") + 1,
        positions[i]
      );

      splitMessage.splice(
        splitPosition.indexOf("["),
        splitPosition.indexOf("]") + 1,
        positions[i]
      );

      const joinName = splitName.join("");
      const joinPosition = splitPosition.join("");

      emailData.push([
        emails[i],
        joinPosition,
        selectedTemplate?.body,
        joinName,
      ]);

      console.log("candidate details:: ", {
        subject: joinName,
        candidateName: joinPosition,
        email: emails[i],
      });
    }

    console.log("email data: ", emailData);

    return;

    try {
      // Assuming the emailData is now in the desired format
      const res = await axios.post(
        "http://localhost:9000/send-emails",
        emailData
      );
      toast.success("Emails Sent Successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("response:: ", res);
      setSendingBtn(false);
    } catch (error) {
      setSendingBtn(false);
      console.log("error: ", error);
      toast.error("Sorry, unable to send emails.", {
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

  // const SendEmail = (e) => {
  //   e.preventDefault();
  //   setSendingBtn(true);

  //   // get emails and insert into email template
  //   const names = candidateData?.map((item) => item[0]);
  //   const positions = candidateData?.map((item) => item[2]);
  //   const emails = candidateData?.map((item) => item[1]);

  //   // just console logging
  //   const tableData = [];
  //   for (let i = 0; i < names.length; i++) {
  //     tableData.push({
  //       Name: names[i],
  //       Position: positions[i],
  //       Email: emails[i],
  //     });
  //   }

  //   console.table(tableData);

  //   const emailData = [];

  //   for (let i = 0; i < names.length; i++) {
  //     const splitName = selectedTemplate?.candidateName.split("");
  //     const splitPosition = selectedTemplate?.subject.split("");

  //     splitName.splice(
  //       splitName.indexOf("["),
  //       splitName.indexOf("]"),
  //       names[i]
  //     );
  //     splitPosition.splice(
  //       splitPosition.indexOf("["),
  //       splitPosition.indexOf("]"),
  //       positions[i]
  //     );

  //     const joinName = splitName.join("");
  //     const joinPosition = splitPosition.join("");
  //     const obj = {
  //       subject: joinName,
  //       candidateName: joinPosition,
  //       email: emails[i],
  //     };

  //     emailData.push({
  //       subject: joinName,
  //       candidateName: joinPosition,
  //       email: emails[i],
  //     });

  //     console.log("candidate details:: ", obj);
  //     console.log("email data array:: ", emailData);
  //   }

  //   const formData = new FormData();

  //   formData.append("candidates", emails);
  //   formData.append("subject");
  //   formData.append("body");

  //   return;

  //   try {
  //     const res = axios.post("http://localhost:6000/send-emails", formData);
  //     toast.success("Emails Sent Successfully .", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     console.log("response:: ", res);
  //     setSendingBtn(false);
  //   } catch (error) {
  //     setSendingBtn(false);
  //     console.error("error: ", error);
  //     toast.error("Sorry, unable to send emails .", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

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
      setCandidateData(data);

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

      {selectedTemplate && (
        <Button
          className=" ml-3 border-1 rounded-2 p-4 font-bold bg-[#1a1a1a] text-white"
          onClick={SendEmail}
        >
          {setSendingBtn ? <span>Send Emails</span> : <CircularProgress />}
        </Button>
      )}

      {open && <Templates open={open} handleOpenModel={handleOpenModel} />}
    </>
  );
}

export default App;

// const names = ["junaid", "qasim", "ubaid", "hamamd"];
// const positions = ["jr dev", "sr qa", "sr react developer at Hikal agency", "sr cloud engineer"];
// const emailsArr = ["sr", "sr2"];

// const emails = [];

// const selectedTemplate = {
//   subjet: "hello mr [name]"
// }

// for(let i = 0 ; i < names.length; i++) {
//   const candid = selectedTemplate.candidateName;
//   const obj = {
//     email: emailsArr[i],
//     candidateName: candid.split(""),
//     subject: positions[i]
//   };
// }
