"use client";

import { ModalContext } from "@/context/context";
import { useState, useContext } from "react";
import AddHtmlModal from "../modals/AddHtmlModal";
import PreviewModal from "../modals/PreviewModal";
import EditHtmlModal from "../modals/EditHtmlModal";
import DeletePageModel from "../modals/DeletePageModel";
import UpdateModal from "../modals/UpdateModal";
import ContactModal from "../modals/ContactModal";

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [type, setType] = useState("");
  const [submitData, setSubmitData] = useState({});

  const onOpen = (data, type) => {
    setSubmitData({});
    setData(data);
    setType(type);
    setOpen(true);
  };

  const onClose = (data) => {
    setSubmitData(data);
    setData({});
    setType("");
    setOpen(false);
  };

  return (
    <>
      <ModalContext.Provider
        value={{
          isOpen: open,
          onOpen,
          onClose,
          type,
          data,
          submitData,
          setSubmitData,
        }}
      >

        {[
          "deletepage",
          "deleteblog",
          "deletecategory",
          "deletecontact",
          "deletequeries",
          "deletepopup",
        ].includes(type) && <DeletePageModel />}

        {type === "updatecategory" && <UpdateModal />}

        <AddHtmlModal />
        {type === "editContent" && <EditHtmlModal />}
      {type === "viewcontact" && <ContactModal/>}
        <PreviewModal />
        {children}
      </ModalContext.Provider>
    </>
  );
};

export default ModalProvider;
