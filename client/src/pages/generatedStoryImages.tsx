import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function GeneratedStoryImages() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={5}>
          <h1>Generated Story Images</h1>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/generated_story_text")}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/your_story")}
            >
              Generate book
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
