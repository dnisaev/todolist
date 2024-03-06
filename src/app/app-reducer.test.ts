import { appActions, appReducer, RequestErrorType, RequestStatusType } from "./app-reducer";

let startState: {
  status: RequestStatusType;
  error: RequestErrorType;
  isInitialized: boolean;
};

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppError({ error: "Error message" }));

  expect(endState.error).toBe("Error message");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, appActions.setAppStatus({ status: "loading" }));

  expect(endState.status).toBe("loading");
});
