interface IActors {
  mainCharacter?: "";
  friend1?: "";
  friend2?: "";
  friend3?: "";
}

interface IAdditionalActors {
  specialCharacter1?: "";
  specialCharacter2?: "";
}

interface IStoryParameters {
  topic?: "";
  hero?: "";
  tutorOptions?: "";
}

interface IStoryModel {
  actors: IActors;
  additionalActors: IAdditionalActors;
  storyParameters: IStoryParameters;
}
