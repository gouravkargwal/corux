import { Grid } from "@mui/material";
import Hero from "../Components/Home/Hero";
import { Link } from "react-router-dom";
import Info from "../Components/Profile/Info";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../Feature/Auth/authSlice";
import GameCard from "../Components/Home/GameCard";
import ColorPredictionImg from "../Assets/Images/wingo.webp";
// import MontyHallImg from "../Assets/Images/montyhall.jpeg";
import ComingSoonImg from "../Assets/Images/comingsoon.webp";

function GridExample() {
  const token = useSelector(selectAuthToken);

  return (
    <>
      <Hero />
      {token && <Info />}
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to="color-prediction">
            <GameCard title="WinGO" time="3min" img={ColorPredictionImg} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {/* <Link to="monty-hall"> */}
          <GameCard title="Monty Hall" time="30sec" img={ComingSoonImg} />
          {/* <GameCard title="Coming Soon" time="30sec" /> */}
          {/* </Link> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {/* <Link to="virtual-slot"> */}
          <GameCard title="Aviator" time="2min" img={ComingSoonImg} />
          {/* </Link> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard title="Casino" time="1min" img={ComingSoonImg} />
        </Grid>
      </Grid>
    </>
  );
}

export default GridExample;
