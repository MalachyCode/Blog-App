import { createSlice } from '@reduxjs/toolkit';

const passwordSlice = createSlice({
  name: 'passwords',
  initialState: '',
  reducers: {
    setPassword(state, action) {
      return action.payload;
    },
  },
});

export const { setPassword } = passwordSlice.actions;
export default passwordSlice.reducer;
