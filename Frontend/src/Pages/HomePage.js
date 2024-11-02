import { Grid } from "@mui/material";
import Hero from "../Components/Home/Hero";
import { Link } from "react-router-dom";
import GameCard from "../Components/Home/GameCard";
import ColorPredictionImg from "../Assets/Images/wingo.webp";
import ComingSoonImg from "../Assets/Images/comingsoon.webp";
import CongratsDialogue from "../Components/Home/CongratsDialog";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog, selectDialogOpen } from "../Feature/Dialog/dialogSlice";

function GridExample() {
  const dispatch = useDispatch();
  const open = useSelector(selectDialogOpen);
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
      <CongratsDialogue
        open={open}
        onClose={() => {
          dispatch(closeDialog());
        }}
      />
    </>
  );
}

export default GridExample;
