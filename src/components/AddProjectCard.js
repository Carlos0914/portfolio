import { useState } from "react";

import PlusIcon from "@mui/icons-material/AddCircleOutline";
import MinusIcon from "@mui/icons-material/RemoveCircleOutline";

import { useStyles } from "../assets/styles/components/AddProjectCard.js";
import NewProjectForm from "./NewProjectForm"

const AddProjectCard = () => {
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div onClick={() => setShowForm((value) => !value)} className={classes.formToggle}>
        {!showForm && <PlusIcon className={classes.toggleForm} />}
        {showForm && <MinusIcon className={classes.toggleForm} />}
        <p>Add a new Project</p>
      </div>
      {showForm && <NewProjectForm />}
    </div>
  );
};

export default AddProjectCard;
