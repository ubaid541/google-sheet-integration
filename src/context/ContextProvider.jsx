import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("currentMode") || "light"
  );

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const DataGridStyles = {
    "& .MuiButtonBase-root": {
      color: currentMode === "dark" ? "white" : "black",
    },
    // TOOLBAR COLORS
    "& .MuiDataGrid-toolbarContainer": {
      // backgroundColor: currentMode === "dark" ? "#212121" : "#000000",
      backgroundColor: currentMode === "dark" ? "#1C1C1C" : "#EEEEEE",
      padding: "10px 5px",
      gap: "15px",
      color: currentMode === "dark" ? "white" : "black",
    },
    // TOOLBAR BUTTON
    "& .MuiInputBase-root": {
      color: currentMode === "dark" ? "white" : "black",
    },
    "& .MuiInputBase-root::before": {
      color: currentMode === "dark" ? "white" : "black",
    },
    "& .MuiInputBase-root:hover::before": {
      color: currentMode === "dark" ? "white" : "black",
    },

    // Background color of header of data grid
    "& .MuiDataGrid-columnHeaders": {
      // css-s3ulew-
      border: "none",
      backgroundColor: currentMode === "dark" ? "#DA1F26" : "#DA1F26",
      color: currentMode === "dark" ? "white" : "white",
      borderRadius: "0",
      width: "100%",
    },
    "& .MuiDataGrid-root .MuiDataGrid-main": {
      height: "auto",
      overflowY: "inherit !important",
    },
    // DATATABLE BORDER - DARK
    "& .MuiDataGrid-root": {
      //css-h0wcjk-
      border: "none !important",
      boxShadow: "none !important",
    },
    // DATATABLE BORDER - LIGHT
    "& .MuiDataGrid-root": {
      //css-hgxfug-
      border: "none !important",
      boxShadow: "none !important",
    },
    "& .MuiIconButton-sizeSmall": {
      color: currentMode === "dark" ? "white" : "black",
    },
    // background color of main table content
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: currentMode === "dark" ? "black" : "white",
      color: currentMode === "dark" ? "white" : "black",
    },
    // changing rows hover color
    "& .MuiDataGrid-row:hover": {
      //css-1uhmucx-
      backgroundColor: currentMode === "dark" && "#1C1C1C",
      border: "none !important",
      boxShadow: "none !important",
    },
    "& .MuiDataGrid-root": {
      //css-s3ulew-
      border: "none !important",
      boxShadow: "none !important",
    },
    "& .MuiDataGrid-root": {
      //css-otzuo3-
      border: "none !important",
      boxShadow: "none !important",
    },
    // changing row colors
    "& .even": {
      backgroundColor: currentMode === "dark" ? "black" : "white",
    },
    // changing rows right border
    // "& .MuiDataGrid-cell": {
    // borderRight: "1px solid rgb(240, 240, 240)",
    // },

    // BACKGROUND COLOR OF FOOTER
    "& .MuiDataGrid-footerContainer": {
      // border: "none",
      borderTop: "2px solid #DA1F26",
      // backgroundColor: currentMode === "dark" ? "#DA1F26" : "#DA1F26",
      backgroundColor: currentMode === "dark" ? "black" : "white",
      color: currentMode === "dark" ? "white" : "black",
    },
    "& .MuiTablePagination-selectLabel": {
      color: currentMode === "dark" ? "white" : "black",
    },
    "& .MuiTablePagination-select ": {
      color: currentMode === "dark" ? "white" : "black",
    },
    "& .MuiSvgIcon-fontSizeMedium ": {
      color: currentMode === "dark" ? "white" : "black",
      // TODO: For Pagination SVG, white
    },
    "& .MuiTablePagination-displayedRows": {
      color: currentMode === "dark" ? "white" : "black",
    },
  };

  const darkModeColors = {
    // For DARK MODE
    // SELECT STATEMENT LABLE COLOR
    "& .MuiInputBase-root": {
      color: currentMode === "dark" && "white !important",
    },

    // TEXT FIELDS LABEL COLOR
    "& .MuiFormLabel-root, & .MuiInputLabel-root, & .MuiInputLabel-formControl":
      {
        color: currentMode === "dark" && "white !important",
      },

    // border color of text fields and select fields
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: currentMode === "dark" && "white !important",
    },

    // color of dropdown button
    "& .MuiSvgIcon-root, & .MuiSvgIcon-fontSizeMedium, & .MuiSelect-icon,& .MuiSelect-iconOutlined":
      {
        color: currentMode === "dark" && "white",
      },
    // text color for textfields
    // "& .MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl":
    //   {
    //     color: currentMode === "dark" && "white",
    //   },
    // hover border color of textfield
    // "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
    //   {
    //     borderColor: currentMode === "dark" && "white",
    //   },
    // fixed lable color
    // "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    //   color: currentMode === "dark" && "#DA1F26",
    // },

    // TABS HEADERS COLOR
    "& .Mui-selected": {
      color: "#DA1F26 !important",
    },
    "& .MuiTab-root,& .MuiTab-textColorPrimary": {
      color: currentMode === "dark" && "white",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#DA1F26 !important",
    },
  };

  function formatTime(dateStr) {
    let date;
    if (dateStr === "now") {
      date = new Date();
    } else {
      date = new Date(dateStr);
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0"); // Convert 0 to 12
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  }

  function formatNum(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentMode,
        formatTime,
        darkModeColors,
        DataGridStyles,
        setCurrentMode,
        formatNum,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
