import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

/*
Checking to see if user is signed in
Setting username, email 
Adding all items for user in array
*/
const initialUserState = {
  loggedIn: false,
  username: '',
  email: '',
  watchList: [],
  items: []
};

export const loginThunk = createAsyncThunk(
  'api/users/getLoginStatus',
  async (body) => {
    try {
      console.log('in the login Thunk, body: ', body);
      const responseJSON = await fetch('/api/login', {
        method: 'POST',
        headrers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const response = await responseJSON.json();
      console.log('login data respose: ', response);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
);

export const signupThunk = createAsyncThunk(
  'api/users/getSignupStatus',
  async (body) => {
    try {
      console.log('in the signup Thunk function, body:', body);
      const responseJSON = await fetch('/api/signup', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const response = await responseJSON.json();
      console.log('signup data response: ', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userItems = createAsyncThunk(
    'api/user/items/${id}',
    async (id) => {
      try {
        console.log('in the userItems Thunk function');
        const responseJSON = await fetch(`/api/user/items/${id}`);
        const response = await responseJSON.json();
        
        console.log('Here is your data: ', response);
        if(Array.isArray(response)) {
          return response.reverse();
        } else return response;
      } catch (e) {
        console.log(e);
      }
    }
  );

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    setWatchList(state, action) {
      state.watchList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload.loggedIn) {
          state.loggedIn = action.payload.loggedIn;
          state.username = action.payload.username;
          state.email = action.payload.firstName;
        }
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        console.log('In builder login, loggedIn:', action.payload);
        if (action.payload.loggedIn) {
          state.loggedIn = action.payload.loggedIn;
          state.username = action.payload.username;
          state.email = action.payload.email;
        }
      })
      .addCase(userItems.fulfilled, (state, action) => {
        state.userItems = action.payload;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
