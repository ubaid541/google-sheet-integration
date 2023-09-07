import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { BsPencil } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IconButton, Textarea } from "@material-tailwind/react";

const SingleTemplate = ({ email, handleOpenModel }) => {
  const { selectedTemplate, setSelectedTemplate } = useStateContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(email?.body);
  console.log("selected template: ", selectedTemplate);

  const handleEditBody = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveBody = (e) => {
    e.stopPropagation();

    setSelectedTemplate({
      ...selectedTemplate,
      body: editedBody,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();

    setEditedBody(email?.body);
    setIsEditing(false);
  };
  const getSubjectWithoutBrackets = (subject) => {
    const startIndex = subject.indexOf("[");

    if (startIndex !== -1) {
      return subject.slice(0, startIndex);
    } else {
      return subject;
    }
  };

  const handleSelectTemplate = (e, email) => {
    console.log("selected template:: ", email);
    // setSelectedTemplate(email);
    handleOpenModel(true);
  };

  useEffect(() => {
    setSelectedTemplate({
      ...email,
      body: editedBody,
    });
  }, []);

  return (
    <>
      <div
        className="bg-[#111827] p-6 cursor-pointer hover:border-[#DA1F26] border transition duration-300"
        onClick={(e) => handleSelectTemplate(e, email)}
      >
        <h2 className="font-bold mb-3">{email?.title}</h2>
        <h3 className="font-semibold mb-2">
          Candidate Name: <span>{email?.candidateName}</span>{" "}
        </h3>
        <h2 className="font-semibold mb-2">
          Subject: <span>{getSubjectWithoutBrackets(email?.subject)}</span>{" "}
        </h2>

        {isEditing ? (
          <>
            <span className="text-[#DA1F26] text-sm">
              Donot remove brackets from the template. No need to add date, time
              and name.
            </span>
            <Textarea
              value={editedBody}
              onChange={(e) => {
                setEditedBody(e.target.value);
              }}
              rows="6"
              // cols="50"
              onClick={(e) => e.stopPropagation()}
            ></Textarea>
            <button onClick={handleSaveBody} className="rounded-full mr-2">
              <AiOutlineCheck />
            </button>
            <button onClick={handleCancelEdit} className="rounded-full mr-2">
              <RxCross1 />
            </button>
          </>
        ) : (
          <>
            <span className="float-right" onClick={handleEditBody}>
              <BsPencil />
            </span>{" "}
            <br />
            <p>{selectedTemplate?.body}</p>
          </>
        )}
      </div>
    </>
  );
};

export default SingleTemplate;
