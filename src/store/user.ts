import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  isLiked: boolean;
};

type UserState = {
  users: User[];
  isLoading: boolean;
  error: string;
};

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<Omit<User, "likes">[]>) {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload.map((user) => ({ ...user, likes: 0 }));
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    toggleLike(state, action: PayloadAction<number>) {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.isLiked = !user.isLiked;
      }
    },
  },
});

export default userSlice.reducer;
export const { toggleLike } = userSlice.actions;
// userSlice.ts (добавляем селектор)
export const selectLikedUsers = (state: { userReducer: UserState }) =>
  state.userReducer.users.filter((user) => user.isLiked);
