import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

interface Props {
  storyModel: IStoryModel;
  handleReInitialiseStory: () => void;
}

export default function GeneratedStoryText({
  storyModel,
  handleReInitialiseStory,
}: Props) {
  const navigate = useNavigate();
  const [story, setStory] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storyParams = { model: storyModel };
    setLoading(true);
    axios
      .post("http://34.201.57.54:3000/generate_story", storyParams)
      // Use this when debugging in order not to spend any money calling openAI
      //.post("http://localhost:3000/stub", storyParams)
      .then((response) => {
        setStory(response.data.message);
        setLoading(false);
      });
  }, []);

  const copyStoryToClipboard = () => {
    let generatedStory: string = story!;
    navigator.clipboard.writeText(generatedStory);
  };

  const handleHomeClick = () => {
    handleReInitialiseStory();
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        minWidth="50vw"
        maxWidth="500"
        sx={{
          "& .MuiTextField-root": {
            m: 2,
            width: "50ch",
          },
        }}
      >
        <Stack
          spacing={2}
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            padding: 5,
            maxWidth: 500,
          }}
        >
          {loading ? (
            <Stack spacing={2}>
              <Typography
                variant="h4"
                color="text.secondary"
                alignSelf={"center"}
              >
                Generating your story
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please wait while we generate your story, this can take up to a
                minute if the storyteller is busy.
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="success" />
              </div>
            </Stack>
          ) : (
            <Stack spacing={2}>
              <Typography
                variant="h4"
                color="text.secondary"
                alignSelf={"center"}
              >
                Enjoy your story below...
              </Typography>
              <TextField
                id="multiline-flexible"
                value={story}
                multiline
                variant="standard"
                maxRows={20}
              />
              <Typography
                variant="body1"
                alignSelf={"center"}
                color="text.secondary"
              >
                You can hit the back button below to change some of the details
                to regenerate your story. If you are happy with the story click
                the Copy button below to save to your clipboard.
              </Typography>
            </Stack>
          )}
          <ButtonGroup
            sx={{ justifyContent: "center" }}
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/story_params")}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={copyStoryToClipboard}
              disabled={loading}
            >
              Copy Story
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleHomeClick}
            >
              Home
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
