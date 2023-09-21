import { createSlice } from '@reduxjs/toolkit';

const authorSlice = createSlice({
  name: 'author',
  initialState: '',
  reducers: {
    setNewAuthor(state, action) {
      return action.payload;
    },
  },
});

export const { setNewAuthor } = authorSlice.actions;
export default authorSlice.reducer;
