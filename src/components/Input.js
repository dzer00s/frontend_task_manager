import React, { Fragment, useState } from "react";
import InputModal from "./InputModal";

const Input = () => {
  const [description, setDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <InputModal open={open} handleClose={handleClose} handleOpen={handleOpen}/>
    </Fragment>
  );
};

export default Input;
