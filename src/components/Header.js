import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useStyles } from "../assets/styles/components/Header";

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileNavigation = (path) => {
    setAnchorEl(null);
    if(path) {
        navigate(path);
    }
  };

  return (
    <>
      <div className={classes.header}>
        <span className={classes.headerTitle} onClick={() => navigate("/")}>
          {" "}
          Carlos Lopez Portfolio
        </span>
        <div className={classes.navContainer}>
          <NavLink
            to="/"
            className={`${classes.navButton} ${
              activeTab === "/" ? classes.active : ""
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={`${classes.navButton} ${
              activeTab === "/projects" ? classes.active : ""
            }`}
          >
            Projects
          </NavLink>
          <NavLink
            to="/experience"
            className={`${classes.navButton} ${
              activeTab === "/experience" ? classes.active : ""
            }`}
          >
            Work Experience
          </NavLink>
        </div>
        <IconButton
          className={classes.menuDropDown}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleMobileNavigation()}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem className={activeTab === '/' ? classes.menuItemActive : ''} onClick={() => handleMobileNavigation("/")}>Home</MenuItem>
          <MenuItem className={activeTab === '/projects' ? classes.menuItemActive : ''} onClick={() => handleMobileNavigation("/projects")}>
            Projects
          </MenuItem>
          <MenuItem className={activeTab === '/experience' ? classes.menuItemActive : ''} onClick={() => handleMobileNavigation("/experience")}>
            Work Experience
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Header;
