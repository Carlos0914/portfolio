import { Box, Modal, TextField, Button, Input } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import client from "../utils/client";
import { saveFile } from "../utils/saveFile";
import { useStyles } from "../assets/styles/components/NewTechModal";

const NewTechModal = (props) => {
  const classes = useStyles();
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
      const [successUpload, url] = await saveFile(logo, "technologies");
      if (successUpload) {
        image_url = url;
        console.log(image_url);
      }
    }
    const { success, response } = await client("/technologies", {
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
        [{ name, url, icon: image_url }, ...prevState].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
      setUrl("");
      setName("");
      setLogo("");
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
                src={renderLogo}
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
