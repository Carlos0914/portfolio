import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    background: "#222222",
    height: 40,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    cursor: "pointer",
    height: 40,
    fontSize: 24,
  },
  navContainer: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    alignItems: "center",
    justifyContent: "center",
    position: "flex-end",
    paddingRight: 10,
  },
  menuDropDown: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
    color: "white !important",
  },
  menuItemActive: {
    background: '#dddddd !important'
  },
  navButton: {
    color: "white",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "0 10px",
    fontWeight: 400,
    height: 40,
  },
  active: {
    background: "black",
  },
}));
