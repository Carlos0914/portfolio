import {
  Card,
  CardContent,
  FormControlLabel,
  TextField,
  MenuItem,
  Grid,
  Button,
  Checkbox,
  Input,
} from "@mui/material";
import reducer, {
  initialState,
  actions,
} from "../utils/reducers/NewProjectReducer";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useReducer, useRef, useState } from "react";

import { useStyles } from "../assets/styles/components/NewProjectForm.js";
import client from "../client";

// import NewTechModal from "./NewTechModal";

const NewProjectForm = () => {
  const classes = useStyles();
  const logoRef = useRef(null);
  const [imageSize, setImageSize] = useState([0, 0]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState({
    name: { valid: true, reason: "" },
    description: { valid: true, reason: "" },
    position_description: { valid: true, reason: "" },
    technologies: { valid: true, reason: "" },
    start_date: { valid: true, reason: "" },
    end_date: { valid: true, reason: "" },
    logo: { valid: true, reason: "" },
  });

  const [allTechnologies, setAllTechnologies] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await fetch("/api/technologies");
      response = await response.json();
      setAllTechnologies(
        response.data.sort((a, b) => a.name.localeCompare(b.name))
      );
    })();
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name": {
        dispatch({
          type: actions.setName,
          payload: event.target.value,
        });
        setCheck((prevState) => {
          return { ...prevState, name: { valid: true, reason: "" } };
        });

        break;
      }
      case "project_description": {
        dispatch({
          type: actions.setDescription,
          payload: event.target.value,
        });
        setCheck((prevState) => {
          return {
            ...prevState,
            description: { valid: true, reason: "" },
          };
        });
        break;
      }
      case "position_description": {
        dispatch({
          type: actions.setPositionDescription,
          payload: event.target.value,
        });
        setCheck((prevState) => {
          return {
            ...prevState,
            position_description: { valid: true, reason: "" },
          };
        });
        break;
      }
      default: {
        const inputElement = logoRef.current?.firstChild;
        if (inputElement.files.length > 0) {
          console.log(inputElement.files[0]);
          dispatch({
            type: actions.setInput,
            payload: inputElement.files[0],
          });
          dispatch({
            type: actions.setRenderLogo,
            payload: URL.createObjectURL(inputElement.files[0]),
          });
          setCheck((prevState) => {
            return {
              ...prevState,
              logo: { valid: true, reason: "" },
            };
          });
        } else {
          dispatch({ type: actions.setInput, payload: null });
          dispatch({ type: actions.setRenderLogo, payload: "" });
          setCheck((prevState) => {
            return {
              ...prevState,
              logo: {
                valid: false,
                reason: "The logo is required",
              },
            };
          });
        }
      }
    }
    return;
  };

  const onImgLoad = (event) => {
    setImageSize([event.target.offsetHeight, event.target.offsetWidth]);
    event.target.src = "";
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // let imageId = "";
    // if (state.input) {
    //     const ab = await state.input.arrayBuffer();
    //     const file = Object.values(new Uint8Array(ab));
    //     imageId = await fetch("/api/images/upload", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             file,
    //             folder: "ProjectLogos",
    //         }),
    //     })
    //         .then(async (response) => {
    //             const result = (await response.json()).data;
    //             console.log(result);
    //             const imageResponse = await fetch("/api/images", {
    //                 method: "POST",
    //                 body: JSON.stringify({
    //                     original_url: result.secure_url,
    //                     resized_url: result.eager[0].secure_url,
    //                     original_size: {
    //                         width: result.width,
    //                         height: result.height,
    //                     },
    //                     asset_id: result.public_id,
    //                 }),
    //             });
    //             const imageData = await imageResponse.json();
    //             console.log(imageData);
    //             return imageData.data._id;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert(error);
    //         });
    // }
    const projectData = {
      name: state.name,
      description: state.description,
      position_description: state.positionDescription,
      technologies: state.technologies.map((item) => item._id),
      start_date: state.startDate?.toLocaleDateString("es") || "",
      end_date: state.endDate?.toLocaleDateString("es") || "",
      // logo: imageId,
    };
    await client("projects", projectData, "POST", {
      "Content-Type": "application/json",
    }).then(async (response) => {
      const { data } = await response.json();
      setCheck(data);
    });
  };

  const handleStartDateChange = (value, keyboardInputValue) => {
    setCheck((prevState) => {
      return {
        ...prevState,
        start_date: { valid: true, reason: "" },
        end_date:
          prevState.end_date.reason ===
          "You need to enter a valid start date first"
            ? { valid: true, reason: "" }
            : prevState.end_date,
      };
    });
    if (keyboardInputValue) {
      if (keyboardInputValue.length === 10) {
        const [day, month, year] = keyboardInputValue.split("/");
        const selectedDate = new Date(+year, +month - 1, +day);
        dispatch({
          type: actions.setStartDate,
          payload: selectedDate,
        });
        console.log(keyboardInputValue);
      } else if (keyboardInputValue.length === 0) {
        dispatch({ type: actions.setStartDate, payload: null });
      }
    } else if (value) {
      dispatch({
        type: actions.setStartDate,
        payload: value,
      });
    }
  };

  const handleEndDateChange = (value, keyboardInputValue) => {
    setCheck((prevState) => {
      return { ...prevState, end_date: { valid: true, reason: "" } };
    });
    if (keyboardInputValue) {
      if (keyboardInputValue.length === 10) {
        const [day, month, year] = keyboardInputValue.split("/");
        const selectedDate = new Date(+year, +month - 1, +day);
        dispatch({
          type: actions.setEndDate,
          payload: selectedDate,
        });
        console.log(keyboardInputValue);
      } else if (keyboardInputValue.length === 0) {
        dispatch({ type: actions.setEndDate, payload: null });
      }
    } else if (value) {
      dispatch({
        type: actions.setEndDate,
        payload: value,
      });
    }
  };

  const handleSelectorChange = (event, child) => {
    const node = child;
    const selection = node.props.value;
    dispatch({
      type: actions.toggleTechnology,
      payload: allTechnologies.find((item) => item.name === selection),
    });
    setCheck((prevState) => {
      return { ...prevState, technologies: { valid: true, reason: "" } };
    });
  };

  return (
    <>
      <Card style={{ border: "1px solid", margin: "15px" }}>
        <CardContent>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              name="name"
              onChange={handleChange}
              value={state.name}
              fullWidth
              label="Project Name"
              type="text"
              inputProps={{ minLength: 2 }}
              error={!check.name.valid}
              helperText={!check.name.valid ? check.name.reason : null}
            />
            <TextField
              name="project_description"
              onChange={handleChange}
              value={state.description}
              fullWidth
              multiline
              label="Project Description"
              type="text"
              error={!check.description.valid}
              helperText={
                !check.description.valid ? check.description.reason : null
              }
            />
            <TextField
              name="position_description"
              onChange={handleChange}
              value={state.positionDescription}
              fullWidth
              multiline
              label="Position Description"
              type="text"
              error={!check.position_description.valid}
              helperText={
                !check.position_description.valid
                  ? check.position_description.reason
                  : null
              }
            />
            <TextField
              name="technologies"
              select
              label="Project Technologies"
              fullWidth
              size="medium"
              error={!check.technologies.valid}
              helperText={
                !check.technologies.valid ? check.technologies.reason : null
              }
              SelectProps={{
                multiple: true,
                value: state.technologies.map((item) => item.name),
                onChange: handleSelectorChange,
                renderValue: (selected) => selected.join(", "),
                MenuProps: {
                  PaperProps: { style: { maxHeight: 300 } },
                },
              }}
            >
              <Button fullWidth onClick={() => setOpen(true)}>
                + Add New Technology
              </Button>
              {allTechnologies.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.name}>
                    <FormControlLabel
                      style={{ pointerEvents: "none" }}
                      control={
                        <Checkbox checked={state.technologies.includes(item)} />
                      }
                      label={
                        <div
                          style={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <img
                            src={item.icon.original_url}
                            width={32}
                            height={32}
                            alt=""
                          />
                          <p
                            style={{
                              marginLeft: "5px",
                            }}
                          >
                            {item.name}
                          </p>
                        </div>
                      }
                    />
                  </MenuItem>
                );
              })}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={!check.start_date.valid ? classes.dateError : ""}
                >
                  <DatePicker
                    value={state.startDate}
                    label="Start Date"
                    onChange={handleStartDateChange}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        helperText={
                          !check.start_date.valid
                            ? check.start_date.reason
                            : null
                        }
                        error={!check.start_date.valid}
                        placeholder="dd/mm/yyyy"
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={!check.end_date.valid ? classes.dateError : ""}
                >
                  <DatePicker
                    value={state.endDate}
                    label="End Date"
                    inputFormat="dd/MM/yyyy"
                    onChange={handleEndDateChange}
                    className={classes.dateInfo}
                    renderInput={(params) => (
                      <TextField
                        helperText={
                          !check.end_date.valid
                            ? check.end_date.reason
                            : "Leave blank for projects that are still in development"
                        }
                        error={!check.end_date.valid}
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Button
              variant="contained"
              color="inherit"
              component="label"
              style={{
                textAlign: "center",
                width: "100%",
                backgroundColor: !check.logo.valid ? "#ff0000aa" : "",
              }}
            >
              Upload Project / Enterprise Logo
              <Input
                ref={logoRef}
                name="logo"
                onChange={handleChange}
                error={!check.logo.valid}
                // value={state.input}
                type="file"
                style={{ display: "none" }}
              />
            </Button>
            {!check.logo.valid && (
              <p className={classes.logoError}>The logo is required</p>
            )}
            {state.renderLogo && (
              <picture>
                <source srcSet={state.renderLogo} type="image/*" />
                <img
                  src={
                    state.renderLogo || "https://via.placeholder.com/250x250"
                  }
                  alt=""
                  onLoad={onImgLoad}
                />
              </picture>
            )}
            {state.renderLogo && imageSize[0] > 0 && (
              <div className={classes.photoContainer}>
                <img
                  src={
                    state.renderLogo || "https://via.placeholder.com/250x250"
                  }
                  alt="Logo"
                  className={classes.logo}
                />
              </div>
            )}
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              disabled={false}
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* <NewTechModal
                open={open}
                setOpen={setOpen}
                setAllTechnologies={setAllTechnologies}
            /> */}
    </>
  );
};

export default NewProjectForm;
