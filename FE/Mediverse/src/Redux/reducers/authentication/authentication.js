import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginned: false,
  user_type: '',
  profile_data: {},
};

export const authenticationSlice = createSlice({
  name: 'authenticate',

  initialState,

  reducers: {
    setLogin: (state, action) => {
      state.loginned = action.payload;
    },
    setUserType: (state, action) => {
      state.user_type = action.payload;
    },
    setProfiledata: (state, action) => {
      state.profile_data = action.payload;
    },
  },
});

export const {setLogin, setProfiledata, setUserType} =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
