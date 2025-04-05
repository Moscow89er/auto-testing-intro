import { AppDispatch } from "../store";
import { userSlice } from "./user";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    dispatch(userSlice.actions.usersFetchingSuccess(users));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(userSlice.actions.usersFetchingError(error.message));
    } else {
      dispatch(userSlice.actions.usersFetchingError("Неизвестная ошибка"));
    }
  }
};
