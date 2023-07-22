const express = require('express')
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
require('dotenv').config()


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const addFriendToPrompt = (friendName) => {
  return "The story should include a friend named " + friendName + ".";
}

const addCharacterToPrompt = (characterName) => {
  return "The story should feature " + characterName + ".";
}

const formatStoryPrompt = (storyModel) => {
  let storyPrompt =
    "Generate a kids short story around 1000 words with a lead character called " +
    storyModel.actors.mainCharacter +
    ". ";

  storyPrompt += storyModel.actors.friend1 ? addFriendToPrompt(storyModel.actors.friend1) : "";
  storyPrompt += storyModel.actors.friend2 ? addFriendToPrompt(storyModel.actors.friend2) : "";
  storyPrompt += storyModel.actors.friend3 ? addFriendToPrompt(storyModel.actors.friend3) : "";

  storyPrompt += storyModel.additionalActors.specialCharacter1 ? addCharacterToPrompt(storyModel.additionalActors.specialCharacter1) : "";
  storyPrompt += storyModel.additionalActors.specialCharacter2 ? addCharacterToPrompt(storyModel.additionalActors.specialCharacter2) : "";

  // set the theme of the story and hero (both required)
  storyPrompt +=
    "The theme of the story should be a " +
    storyModel.storyParameters.topic +
    ", where " +
    storyModel.storyParameters.hero +
    " is the hero.  The story should be fun and include interactions between the characters.";

  return storyPrompt;
};

// call this when working on front end stuff.
app.post('/stub', async (req, res) => {

  try {

    await new Promise(r => setTimeout(r, 5000));

    return res.status(200).json({
      success: true,
      message: "Generate a kids short story around 1000 words with a lead character called Stephen. ",
    });

  } catch (error) {
    console.log(error.message);
  }
});


app.post('/generate_story', async (req, res) => {

  const prompt = req.body.model;
  let formattedPrompt = "";

  try {
    if (prompt == null) {
      return res.status(200).json({
        success: true,
        data: "No prompt provided",
      })
    } else {
      formattedPrompt = formatStoryPrompt(prompt);
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: formattedPrompt }],
    });

    const completion = response.data.choices[0].message.content;

    return res.status(200).json({
      success: true,
      message: completion,
    });

  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
