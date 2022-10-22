import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid black",
    borderRadius: 15,
    boxShadow: "10px 5px 5px #222222",
    margin: "1rem",
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    background: 'white',
    height: 'max-content'
  },
  about: {
    textAlign: "center",
    fontWeight: "bold !important",
  },
  leftColumn: {
    paddingTop: 50,
    minWidth: '100%',
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
        minWidth: 250,
    }
  },
  middleColumn: {
    minWidth: 'calc(100% - 500px)',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
        minWidth: 400,
    }
  },
  rightColumn: {
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
        minWidth: 250,
    }
  },
  photoContainer: {
    display: "flex",
    maxHeight: 250,
    maxWidth: "auto",
    justifyContent: "center",
    paddingBottom: 5,
  },
  pp: {
    width: 200,
    height: 200,
    objectFit: 'scale-down',
    borderRadius: "50%",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 8,
  },
  description: {
    padding: 25,
  },
}));
