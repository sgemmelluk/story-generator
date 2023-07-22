import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  storyModel: IStoryModel;
}

export default function GeneratedStoryText({ storyModel }: Props) {
  const navigate = useNavigate();
  const [story, setStory] = useState<String>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storyParams = { model: storyModel };
    setLoading(true);
    axios
      .post("http://localhost:3000/generate_story", storyParams)
      .then((response) => {
        setStory(response.data.message);
        setLoading(false);
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
          sx={{ bgcolor: "white", borderRadius: 5, padding: 5, margin: "20%" }}
        >
          <Card sx={{ minWidth: 275 }}>
            {loading ? (
              <CardContent>
                <CircularProgress color="success" />
                Generating your story...
              </CardContent>
            ) : (
              <CardContent>
                <Typography variant="h3" color="text.secondary" gutterBottom>
                  Enjoy your story below...
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {story}
                </Typography>
              </CardContent>
            )}
          </Card>

          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/story_params")}
            >
              Back
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </>
  );
}
