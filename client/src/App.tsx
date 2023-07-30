import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainActors from "./pages/mainActors";
import Welcome from "./pages/Welcome";
import AdditionalActors from "./pages/additionalActors";
import StoryParams from "./pages/storyParams";
import GeneratedStoryText from "./pages/generatedStoryText";
import { useState } from "react";

function App() {
  const [storyModel, setStoryModel] = useState<IStoryModel>({
    actors: { mainCharacter: "", friend1: "", friend2: "", friend3: "" },
    additionalActors: { specialCharacter1: "", specialCharacter2: "" },
    storyParameters: { topic: "", hero: "" },
  });

  const handleActorsAdded = (actors: IActors) => {
    setStoryModel((storyModel) => ({
      ...storyModel,
      actors,
    }));
  };

  const handleAdditionalActorsAdded = (additionalActors: IAdditionalActors) => {
    setStoryModel((storyModel) => ({
      ...storyModel,
      additionalActors,
    }));
  };

  const handleStoryParamsAdded = (storyParameters: IStoryParameters) => {
    setStoryModel((storyModel) => ({
      ...storyModel,
      storyParameters,
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route
          path="/actors"
          element={
            <MainActors
              mainActors={storyModel.actors}
              handleActorsAdded={handleActorsAdded}
            />
          }
        ></Route>
        <Route
          path="/additional_actors"
          element={
            <AdditionalActors
              additionalActors={storyModel.additionalActors}
              handleAdditionalActorsAdded={handleAdditionalActorsAdded}
            />
          }
        ></Route>
        <Route
          path="/story_params"
          element={
            <StoryParams
              actors={storyModel.actors}
              additionalActors={storyModel.additionalActors}
              storyParameters={storyModel.storyParameters}
              handleStoryParamsAdded={handleStoryParamsAdded}
            />
          }
        ></Route>
        <Route
          path="/generated_story_text"
          element={<GeneratedStoryText storyModel={storyModel} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
