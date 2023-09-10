import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import * as styles from "../styles";

interface Props {
  actors: IActors;
  additionalActors: IAdditionalActors;
  storyParameters: IStoryParameters;
  handleStoryParamsAdded: (storyParameters: IStoryParameters) => void;
}

export default function StoryParams({
  actors,
  additionalActors,
  storyParameters,
  handleStoryParamsAdded,
}: Props) {
  const navigate = useNavigate();

  const [topicError, setTopicError] = useState(false);
  const [storyParams, setstoryParams] =
    useState<IStoryParameters>(storyParameters);

  const handleNext = () => {
    if (!storyParams.topic) {
      setTopicError(true);
    } else {
      handleStoryParamsAdded(storyParams);
      navigate("/generated_story_text");
    }
  };

  const handleBack = () => {
    handleStoryParamsAdded(storyParams);
    navigate("/additional_actors");
  };

  const handleHeroChange = (event: SelectChangeEvent) => {
    setstoryParams({ ...storyParams, [event.target.name]: event.target.value });
  };

  const handleTutorOptionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setstoryParams({
      ...storyParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleTopicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTopicError(false);
    setstoryParams({
      ...storyParams,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid container maxWidth="md">
      <Grid item xs={12}>
        <Stack spacing={2} sx={styles.stack}>
          <Typography variant="h4" color="text.secondary" alignSelf={"center"}>
            Almost there...
          </Typography>
          <Typography variant="body1" color="text.primary">
            You are one step away from generating your story, tell us what you
            would like to be the theme of your story and more importantly who is
            going to be the hero!
          </Typography>
          <TextField
            required
            id="story-topic"
            label="Story Topic"
            name="topic"
            onChange={handleTopicChange}
            value={storyParams.topic}
            placeholder="e.g. A Pirate Adventure, Space story, Football match.  Try anything! "
            error={topicError}
            helperText={topicError ? "Please enter a story topic" : " "}
          />
          <FormControl>
            <InputLabel id="hero-select-label">Hero</InputLabel>
            <Select
              labelId="hero-select-label"
              id="hero-select"
              value={storyParams.hero ? storyParams.hero : actors.mainCharacter}
              name="hero"
              input={<OutlinedInput label="Hero" />}
              onChange={handleHeroChange}
            >
              <MenuItem value={actors.mainCharacter}>
                {actors.mainCharacter}
              </MenuItem>

              {actors.friend1 && (
                <MenuItem value={actors.friend1}>{actors.friend1}</MenuItem>
              )}

              {actors.friend2 && (
                <MenuItem value={actors.friend2}>{actors.friend2}</MenuItem>
              )}

              {actors.friend3 && (
                <MenuItem value={actors.friend3}>{actors.friend3}</MenuItem>
              )}

              {additionalActors.specialCharacter1 && (
                <MenuItem value={additionalActors.specialCharacter1}>
                  {additionalActors.specialCharacter1}
                </MenuItem>
              )}

              {additionalActors.specialCharacter2 && (
                <MenuItem value={additionalActors.specialCharacter2}>
                  {additionalActors.specialCharacter2}
                </MenuItem>
              )}
            </Select>
            <TextField
              sx={{ marginTop: 4 }}
              id="Tutor-textarea"
              label="Tutor options"
              name="tutorOptions"
              maxRows={10}
              placeholder="Enter short sentences that will be used when generating the story, make sure a full stop after each one.
              E.g. 
              Bob is a boy.  
              Dont include any physical attributes in the story.
              Etc..."
              multiline
              value={storyParams.tutorOptions}
              onChange={handleTutorOptionsChange}
            />
          </FormControl>
          <ButtonGroup
            sx={{ justifyContent: "center" }}
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Generate Story
            </Button>
          </ButtonGroup>
        </Stack>
      </Grid>
    </Grid>
  );
}
