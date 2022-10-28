import { Box, Modal, TextField, Button, Input } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import client from "../client";

// import classes from "./NewTechModal.module.css";

const NewTechModal = (props) => {
  const classes = {};
  const logoRef = useRef(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState();
  const [renderLogo, setRenderLogo] = useState("");

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "url":
        setUrl(event.target.value);
        break;
      default:
        const inputElement = logoRef.current.firstChild;
        if (inputElement.files.length > 0) {
          setLogo(inputElement.files[0]);
          setRenderLogo(URL.createObjectURL(inputElement.files[0]));
        }
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let image_url = "";
    if (logo) {
      const file = new Blob([logo]);
      const { success, response } = await client("assets", file, "POST", {});
      console.log(success, response);
      if (success && response) {
        image_url = response.image_url;
      } else {
        console.log(response);
      }
    }
    const { success, response } = await client("technologies", {
      method: "POST",
      body: JSON.stringify({
        name,
        url,
        icon: image_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (success && response) {
      props.setAllTechnologies((prevState) =>
        [response, ...prevState].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Box className={classes.modal}>
        <h2>Register a new technology</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            onChange={handleChange}
            value={name}
            name="name"
          />
          <TextField
            fullWidth
            label="Official URL"
            onChange={handleChange}
            value={url}
            name="url"
          />

          <Button
            variant="contained"
            color="inherit"
            component="label"
            style={{ textAlign: "center" }}
          >
            Upload Icon
            <Input
              ref={logoRef}
              name="logo"
              onChange={handleChange}
              // value={state.input}
              type="file"
              style={{ display: "none" }}
            />
          </Button>
          <br />
          {renderLogo && (
            <span className={classes.photoContainer}>
              <img
                src={renderLogo || "https://via.placeholder.com/250x250"}
                alt="Logo"
              />
            </span>
          )}
          <br />
          <span className={classes.modalActions}>
            <Button
              onClick={() => props.setOpen(false)}
              variant="contained"
              style={{
                background: "#666666",
                marginRight: "5px",
              }}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </span>
        </form>
      </Box>
    </Modal>
  );
};

export default NewTechModal;
