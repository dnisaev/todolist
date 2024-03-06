import App from "./App";
import { ReduxStoreProviderDecorator } from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
  title: "TODOLISTS/AppStories",
  component: App,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
};

export const AppStory = () => {
  return <App demo={true} />;
};
