import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <Box component="span" display="flex">
        <Stack
          spacing={5}
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            padding: 5,
            marginLeft: 30,
            marginRight: 30,
            maxWidth: 500,
          }}
        >
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
        </Stack>
      </Box>
    </>
  );
}
