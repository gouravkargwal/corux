import { Grid, Paper, Typography } from "@mui/material";
import Hero from "../Components/Home/Hero";
import { Link } from "react-router-dom";
import Info from "../Components/Profile/Info";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../Feature/Auth/authSlice";
import GameCard from "../Components/Home/GameCard";

function GridExample() {
  const user = useSelector(selectAuthUser);

  return (
    <>
      <Hero />
      {user && <Info />}
      <Grid container spacing={2} p={3}>
        <Grid item xs={6}>
          <Link to="color-prediction">
            <GameCard title="Color Title" time="3min" />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="monty-hall">
            <GameCard title="Dice" time="30sec" />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="virtual-slot">
            <GameCard title="Monty Hall" time="2min" />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <GameCard title="Prob" time="1min" />
        </Grid>
      </Grid>
    </>
  );
}

export default GridExample;
