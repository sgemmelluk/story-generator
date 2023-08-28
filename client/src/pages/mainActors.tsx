import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as styles from "../styles";

interface Props {
  mainActors: IActors;
  handleActorsAdded: (actors: IActors) => void;
}

export default function MainActors({ mainActors, handleActorsAdded }: Props) {
  const navigate = useNavigate();

  const [mainCharacterError, setMainCharacterError] = useState(false);
  const [actors, setActors] = useState<IActors>(mainActors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMainCharacterError(false);
    setActors({
      ...actors,
      [event.target.name]: event.target.value,
    });
  };

  const handleNext = () => {
    if (!actors.mainCharacter) {
      setMainCharacterError(true);
    } else {
      handleActorsAdded(actors);
      navigate("/additional_actors");
    }
  };

  return (
    <Grid container maxWidth="md">
      <Grid item xs={12}>
        <Stack spacing={5} sx={styles.stack}>
          <Typography variant="h4" color="text.secondary" alignSelf={"center"}>
            Add Story Characters
          </Typography>
          <Typography variant="body1" color="text.primary">
            Add the names of the people you want to appear in your story below.
            Only the main character is required to be entered.
          </Typography>
          <TextField
            required
            id="main-character"
            name="mainCharacter"
            label="Main Character"
            value={actors.mainCharacter}
            onChange={handleChange}
            error={mainCharacterError}
            helperText={mainCharacterError ? "Main character is required" : " "}
          />
          <TextField
            id="friend-1"
            name="friend1"
            label="First friends name"
            value={actors.friend1}
            onChange={handleChange}
          />
          <TextField
            id="friend-2"
            name="friend2"
            label="Second friends Name"
            value={actors.friend2}
            onChange={handleChange}
          />
          <TextField
            id="friend-3"
            name="friend3"
            label="Third friends Name"
            value={actors.friend3}
            onChange={handleChange}
          />
          <Button
            sx={{ justifyContent: "center" }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
