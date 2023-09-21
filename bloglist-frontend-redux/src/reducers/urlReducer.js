import { createSlice } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'urls',
  initialState: '',
  reducers: {
    setNewUrl(state, action) {
      return action.payload;
    },
  },
});

export const { setNewUrl } = urlSlice.actions;
export default urlSlice.reducer;
