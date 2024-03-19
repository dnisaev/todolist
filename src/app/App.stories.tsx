import { ReduxStoreProviderDecorator } from "common/stories/decorators/ReduxStoreProviderDecorator";
import { App } from "./App";

export default {
  title: "TODOLISTS/AppStories",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
};

export const AppStory = () => {
  return <App demo={true} />;
};
