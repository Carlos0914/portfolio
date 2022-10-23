import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid black",
    borderRadius: 15,
    paddingTop: 10,
    boxShadow: "10px 5px 5px #222222",
    margin: "1rem",
    textAlign: 'center',
    background: "white",
    height: "max-content",
    "& p": {
        padding: 0,
        marginTop: 5,
        fontSize: 'large'
    }
  },
  toggleForm: {
    width: '100% !important',
    fontSize: '80px !important'
  }
}));
