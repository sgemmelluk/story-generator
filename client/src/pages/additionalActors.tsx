import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import Typography from "@mui/material/Typography";

interface Props {
  additionalActors: IAdditionalActors;
  handleAdditionalActorsAdded: (additionalActors: IAdditionalActors) => void;
}

export default function AdditionalActors({
  additionalActors,
  handleAdditionalActorsAdded,
}: Props) {
  const navigate = useNavigate();
  const [actors, setActors] = useState<IAdditionalActors>(additionalActors);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setActors({
      ...actors,
      [event.target.name]: event.target.value,
    });
  };

  const handleNext = () => {
    handleAdditionalActorsAdded(actors);
    navigate("/story_params");
  };

  const handleBack = () => {
    handleAdditionalActorsAdded(actors);
    navigate("/actors");
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
          spacing={5}
          sx={{ bgcolor: "white", borderRadius: 5, padding: 5, maxWidth: 500 }}
        >
          <Typography variant="h4" color="text.secondary" alignSelf={"center"}>
            Enter Special Characters
          </Typography>
          <Typography variant="body1" color="text.primary">
            Here you can add some special characters to be included, this could
            be a superhero or even a family pet. If adding a pet make sure you
            tell us what type of animal it is, e.g. "Lucy the Cat" or "Brian the
            Parrot"
          </Typography>
          <TextField
            id="special-character1"
            label="1st Special Character"
            name="specialCharacter1"
            value={actors.specialCharacter1}
            onChange={handleChange}
            placeholder="E.g. Spiderman"
          />
          <TextField
            id="special-character2"
            label="2nd Special Character"
            name="specialCharacter2"
            value={actors.specialCharacter2}
            onChange={handleChange}
            placeholder="E.g. Rover the dog"
          />
          <ButtonGroup
            sx={{ justifyContent: "center" }}
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
