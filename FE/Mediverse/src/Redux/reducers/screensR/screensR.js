import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  net_con: true,
};

export const screenRSlice = createSlice({
  name: 'screenR',

  initialState,

  reducers: {
    setNetConnet: (state, action) => {
      state.net_con = action.payload;
    },
  },
});

export const {setNetConnet} = screenRSlice.actions;

export default screenRSlice.reducer;
