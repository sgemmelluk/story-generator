import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import * as styles from "../styles";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Grid container maxWidth="md">
      <Grid item xs={12}>
        <Stack spacing={5} sx={styles.stack}>
          <Typography variant="h2" color="text.secondary" alignSelf={"center"}>
            Welcome
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Welcome to the story generator.
            <br />
            <br /> In just a few moments you can generate a short story that
            includes yourself, your friends and some special story characters
            that you want to take on your journey.
            <br />
            <br /> You can also pick the type of adventure you want to go on and
            who the hero will be. So go ahead and click below to start your
            adventure.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("actors")}
          >
            Create your story...
          </Button>
          <Button onClick={() => navigate("about")}>About this app</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
