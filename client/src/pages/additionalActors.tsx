import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

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
        <Stack
          spacing={5}
          sx={{ bgcolor: "white", borderRadius: 5, padding: 5 }}
        >
          <h1>Enter Special Characters</h1>
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

          <ButtonGroup variant="outlined" aria-label="outlined button group">
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
