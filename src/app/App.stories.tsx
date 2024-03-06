import App from "./App";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import StoryRouter from "storybook-react-router";

export default {
  title: "TODOLISTS/AppStories",
  component: App,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator, StoryRouter()],
};

export const AppStory = () => {
  return <App demo={true} />;
};
