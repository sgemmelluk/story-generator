import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTopicError(false);
    setstoryParams({
      ...storyParams,
      [event.target.name]: event.target.value,
    });
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
          sx={{ bgcolor: "white", borderRadius: 5, padding: 5, maxWidth: 500 }}
        >
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
            onChange={handleChange}
            value={storyParams.topic}
            placeholder="e.g.Pirate Adventure"
            error={topicError}
            helperText={topicError ? "Please enter a story topic" : " "}
          />
          <FormControl>
            <InputLabel
              sx={{ marginLeft: 2, marginRight: 2 }}
              id="hero-select-label"
            >
              Hero
            </InputLabel>
            <Select
              sx={{ marginLeft: 2, marginRight: 2 }}
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
      </Box>
    </>
  );
}
