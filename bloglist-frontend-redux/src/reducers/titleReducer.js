import { createSlice } from '@reduxjs/toolkit';

const titleSlice = createSlice({
  name: 'title',
  initialState: '',
  reducers: {
    setNewTitle(state, action) {
      return action.payload;
    },
  },
});

export const { setNewTitle } = titleSlice.actions;
export default titleSlice.reducer;
