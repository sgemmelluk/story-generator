import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function GeneratedStory() {
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
        <Stack
          spacing={5}
          sx={{ bgcolor: "white", borderRadius: 5, padding: 5 }}
        >
          <h1>Generated Story - End page</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Done
          </Button>
        </Stack>
      </Box>
    </>
  );
}
