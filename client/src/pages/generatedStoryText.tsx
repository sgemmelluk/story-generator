import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Grid, TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import * as styles from "../styles";

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
    let generateStoryURL =
      "http://" + window.location.hostname + ":3000/generate_story";
    axios.post(generateStoryURL, storyParams).then((response) => {
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
    <Grid container maxWidth="md">
      <Grid item xs={12}>
        <Stack spacing={2} sx={styles.stack}>
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
      </Grid>
    </Grid>
  );
}
