import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "fit-content",
    backgroundColor: "white",
    /* border: 2px solid #000, */
    display: "block",
    boxShadow: 24,
    padding: "15px !important",
    width: "80%",
    minWidth: 240,
    maxWidth: 600,
    "& h2": {
      textAlign: "center",
    },
    "& div": {
      marginBottom: 5,
    },
  },
  photoContainer: {
    width: 128, 
    height: 128,
    display: 'block',
    margin: '0 auto',
    "& img": {
      width: 'inherit'
    }
  },
  modalActions: {
    float: "right",
  },
}));
