import { appActions, appSlice, RequestErrorType, RequestStatusType } from "app/model/appSlice";

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
  const endState = appSlice(startState, appActions.setAppError({ error: "Error message" }));

  expect(endState.error).toBe("Error message");
});

test("correct status should be set", () => {
  const endState = appSlice(startState, appActions.setAppStatus({ status: "loading" }));

  expect(endState.status).toBe("loading");
});
