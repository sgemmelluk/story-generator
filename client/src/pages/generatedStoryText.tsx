import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

interface Props {
  storyModel: IStoryModel;
}

export default function GeneratedStoryText({ storyModel }: Props) {
  const navigate = useNavigate();
  const [story, setStory] = useState<String>();

  useEffect(() => {
    const storyParams = { model: storyModel };
    axios
      .post("http://192.168.0.27:3000/generate_story", storyParams)
      .then((response) => {
        console.log(response);
        setStory(response.data.message);
      });
  }, []);

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
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h3" color="text.secondary" gutterBottom>
                Review your story
              </Typography>
              <Typography>{story}</Typography>
            </CardContent>
          </Card>

          <ButtonGroup variant="outlined" aria-label="outlined button group">
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
              onClick={() => navigate("/generated_story_images")}
            >
              Next
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
