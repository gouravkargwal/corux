import { Grid } from "@mui/material";
import Hero from "../Components/Home/Hero";
import { Link } from "react-router-dom";
import GameCard from "../Components/Home/GameCard";
import ColorPredictionImg from "../Assets/Images/wingo.webp";
import AviatorImg from "../Assets/Images/aviator.webp";
import MinesImg from "../Assets/Images/mines.webp";
import PlinkoImg from "../Assets/Images/plinko.webp";
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
            <GameCard title="Color Prediction" time="3m" img={ColorPredictionImg} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard title="Aviator" time="Coming Soon" img={AviatorImg} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard title="Mines" time="Coming Soon" img={MinesImg} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard title="Plinko" time="Coming Soon" img={PlinkoImg} />
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
