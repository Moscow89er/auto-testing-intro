import authReducer, { authActions } from "../../../store/auth";

describe("auth reducer", () => {
  it("должен устанавливать isAuthenticated в true при вызове login", () => {
    const initialState = { isAuthenticated: false };
    const newState = authReducer(initialState, authActions.login());
    expect(newState.isAuthenticated).toBe(true);
  });
  
  it("должен устанавливать isAuthenticated в false при вызове logout", () => {
    const initialState = { isAuthenticated: true };
    const newState = authReducer(initialState, authActions.logout());
    expect(newState.isAuthenticated).toBe(false);
  });
});
