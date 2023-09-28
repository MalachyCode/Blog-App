import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    createUser(state, action) {
      const username = action.payload.username;
      const name = action.payload.name;
      // const password = action.payload.password;
      state.push({
        username,
        name,
        // password,
      });
    },
    appendUsers(state, action) {
      state.push(action.payload);
    },
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { createUsers, appendUsers, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
