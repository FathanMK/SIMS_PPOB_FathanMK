import {createSlice} from '@reduxjs/toolkit';

interface IInitialState {
  token: string;
  user: any;
  balance: number;
}

const initialState: IInitialState = {
  token: '',
  user: null,
  balance: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const {setToken, setUser, setBalance} = userSlice.actions;
export default userSlice.reducer;
