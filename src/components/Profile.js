import React from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutlined";
import { useStyles } from "../assets/styles/components/Profile";

const Profile = () => {
  const props = { projects: [] };
  const classes = useStyles();
  const allTechnologies = []
//   const [allTechnologies, setAllTechnologies] = useState([]);

  // useEffect(() => {
  //     (async () => {
  //         let response = await fetch('/api/technologies')
  //         response = await response.json()
  //         setAllTechnologies(response.data.sort((a,b) => a.name.localeCompare(b.name)).slice(0,9))
  //     })()
  //     }, [])

  return (
    <div className={classes.card}>
      <div className={classes.leftColumn}>
        <span className={classes.photoContainer}>
          <img
            src={"/pp.png"}
            alt="Profile"
            className={classes.pp}
            width={250}
            height={250}
          />
        </span>
        <Typography component="div" className={classes.about}>
          Contact
          <br />
          <Typography
            component="div"
            style={{
              cursor: "pointer",
            }}
            onClick={() => window.open("mailto:carloslop0914@gmail.com")}
          >
            <MailIcon
              style={{
                fontSize: "32px",
                marginBottom: "0",
              }}
            />
            <p style={{ marginTop: "-10px", overflowWrap: "break-word" }}>
              carloslop0914@gmail.com
            </p>
          </Typography>
          <Typography
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open("https://www.linkedin.com/in/carlos-lopez-dev/")
            }
          >
            <img
              src={"/linkedinicon.png"}
              alt="LinkedIn Icon"
              width="32px"
              height="32px"
            />
            <p style={{ marginTop: "-5px" }}>/carlos-lopez-dev</p>
          </Typography>
        </Typography>
      </div>
      <div className={classes.middleColumn}>
        <Typography className={classes.about}>About me</Typography>
        <Typography className={classes.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quo
          facere, in dolores quaerat eius? Voluptatem, veniam nemo. Et mollitia
          laudantium perspiciatis non, excepturi nesciunt impedit vitae porro
          nostrum suscipit! Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Cumque neque, facilis magni odit dicta distinctio fugiat, eius
          pariatur reiciendis veniam voluptas? Impedit enim amet officia! A
          nesciunt hic necessitatibus veritatis? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Officia, sunt repellat et quidem
          distinctio dicta dolor corrupti recusandae consequuntur natus
          repudiandae veniam ad numquam quam quasi rem sed sapiente. Ut?
        </Typography>
      </div>
      <div className={classes.rightColumn}>
        <Typography className={classes.about}>Tech Stack</Typography>
        <Grid container>
          {allTechnologies.map((element, index) => (
            <Grid
              key={index}
              item
              xs={2}
              sm={2}
              md={4}
              className={classes.iconContainer}
            >
              <img
                src={element.icon.original_url}
                alt={`${element.name} icon`}
                width="64px"
                height="64px"
              />
            </Grid>
          ))}
        </Grid>
      <Typography className={classes.about} style={{ paddingTop: "10px" }}>
        Projects I worked on
      </Typography>
      <Grid container>
        {props.projects.map((element, index) => (
          <Grid
            key={index}
            item
            xs={2}
            sm={2}
            md={4}
            className={classes.iconContainer}
          >
            <img
              src={element.logo.resized_url}
              alt={`${element.name} logo`}
              width={64}
              height={64}
            />
          </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
};

export default Profile;
