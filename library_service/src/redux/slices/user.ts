import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser as createUseAPI, listUsers as listUsersAPI } from 'src/utils/axios';
import { CreateBook, CreateUser, User } from 'src/utils/type';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const fetchUserThunk = createAsyncThunk('fetch/user', async () => {
  return listUsersAPI();
});

export const createUserThunk = createAsyncThunk('create/user', async (data: CreateUser) => {
  return createUseAPI(data);
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.users.push(action.payload.data);
      });
  },
});

export default usersSlice.reducer;
