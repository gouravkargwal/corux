import { Grid } from "@mui/material";
import Hero from "../Components/Home/Hero";
import { Link } from "react-router-dom";
import GameCard from "../Components/Home/GameCard";
import ColorPredictionImg from "../Assets/Images/wingo.webp";
import ComingSoonImg from "../Assets/Images/comingsoon.webp";

function GridExample() {
  return (
    <>
      <Hero />
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to="color-prediction">
            <GameCard title="WinGO" time="3min" img={ColorPredictionImg} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard title="Monty Hall" time="30sec" img={ComingSoonImg} />
        </Grid>
      </Grid>
    </>
  );
}

export default GridExample;
