import React from "react";
import { useStateContext } from "../../context/ContextProvider";

const SingleTemplate = ({ email, handleOpenModel }) => {
  const { selectedTemplate, setSelectedTemplate } = useStateContext();
  const handleSelectTemplate = (e, id) => {
    console.log("selected template:: ", id);
    setSelectedTemplate(id);
    handleOpenModel(true);
  };
  return (
    <>
      <div
        className="bg-[#111827] p-6 cursor-pointer hover:border-[#DA1F26] border transition duration-300"
        onClick={(e) => handleSelectTemplate(e, email?.id)}
      >
        <h2 className="font-bold mb-3">{email?.title}</h2>
        <h3 className="font-semibold mb-2">
          Candidate Name: <span>{email?.candidateName}</span>{" "}
        </h3>
        <p>{email?.body}</p>
      </div>
    </>
  );
};

export default SingleTemplate;
