import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { App } from "./App";

export default {
  title: "TODOLISTS/AppStories",
  component: App,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
};

export const AppStory = () => {
  return <App demo={true} />;
};
