const express = require('express')
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors')
const app = express()
const axios = require('axios');
const port = 3000
app.use(cors())
app.use(express.json());
require('dotenv').config()


const configuration = new Configuration({
  organixation: 'org-IcJhPKmrQuHgR1qE3FR78f3A',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const formatStoryPrompt = (storyModel) => {
  let storyPrompt =
    "Generate a kids short story around 1000 words with a lead character called " +
    storyModel.actors.mainCharacter +
    ". ";

  storyPrompt += storyModel.actors.friend1
    ? "The story should include a friend named " +
    storyModel.actors.friend1 +
    ". "
    : "";

  storyPrompt += storyModel.actors.friend2
    ? "The story should include a friend named " +
    storyModel.actors.friend2 +
    ". "
    : "";

  storyPrompt += storyModel.actors.friend3
    ? "The story should include a friend named " +
    storyModel.actors.friend3 +
    ". "
    : "";

  storyPrompt += storyModel.additionalActors.specialCharacter1
    ? "The story should feature " +
    storyModel.additionalActors.specialCharacter1 +
    ". "
    : "";

  storyPrompt += storyModel.additionalActors.specialCharacter2
    ? "The story should feature " +
    storyModel.additionalActors.specialCharacter2 +
    ". "
    : "";

  // set the theme of the story and hero (both required)
  storyPrompt +=
    "The theme of the story should be a " +
    storyModel.storyParameters.topic +
    ", where " +
    storyModel.storyParameters.hero +
    " is the hero.  The story should be fun and include interactions between the characters.";

  return storyPrompt;
};


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
