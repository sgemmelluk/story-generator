import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Box component="span" display="flex">
        <Stack
          spacing={2}
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            padding: 5,
            marginLeft: 30,
            marginRight: 30,
            maxWidth: 500,
          }}
        >
          <Typography variant="h4" color="text.secondary">
            About the app
          </Typography>
          <Typography variant="body1" color="text.primary">
            This application prompts the user to enter some names to include in
            a story with a topic of the users choosing. GenerativeAI is then
            used to create a child's story.
            <br />
            <br />
            No personal data is stored by the application.
            <br />
          </Typography>
          <Typography variant="h4" color="text.secondary">
            About me
          </Typography>
          <Typography variant="body1" color="text.primary">
            I am currently working as a Software Development Manager where I
            find myself coding less and less in my role. I still hold a keen
            interest in programming and like to keep my skills up to date and
            play around with various technologies.
            <br />
            <br />
            In this case those technologies were - Vite, openAI API, React,
            Material UI and Express JS on the server side.
            <br />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </Stack>
      </Box>
    </>
  );
}
