import { IconButton, Modal } from "@mui/material";
import React from "react";
import { IoMdClose } from "react-icons/io";
import SingleTemplate from "./SingleTemplate";
import { emailTemplates } from "../../emailTemplatesList";

export const Templates = ({ open, handleOpenModel }) => {
  const style = {
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    height: "70%",
    overflowY: "scroll",
  };
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleOpenModel}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        closeAfterTransition
      >
        <div
          style={style}
          className={`w-[calc(100%-20px)] md:w-[50%]  
            bg-[#1c1c1c]
           absolute top-1/2 left-1/2 p-5 rounded-md`}
        >
          <IconButton
            sx={{
              position: "absolute",
              right: 12,
              top: 10,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleOpenModel}
          >
            <IoMdClose size={18} />
          </IconButton>

          <>
            {/*  */}
            <h1 className={`text-white text-center font-bold text-xl pb-10`}>
              Select An Email Template
            </h1>

            <div className="w-full my-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-3 gap-y-3">
              {emailTemplates?.length > 0 ? (
                emailTemplates?.map((email, index) => (
                  <SingleTemplate email={email} key={index} />
                ))
              ) : (
                <h2 className="text-center"> No Templates Available</h2>
              )}
            </div>
          </>
        </div>
      </Modal>
    </>
  );
};
