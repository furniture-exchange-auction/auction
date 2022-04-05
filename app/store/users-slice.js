import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialUserState = {
	loggedIn: false,
	username: '',
	firstName: '',
};

export const loginThunk = createAsyncThunk(
	'users/getLoginStatus',
	async (body) => {
		try {
			console.log('in the login Thunk, body: ', body);
			const responseJSON = await fetch('/user/login', {
				method: 'POST',
				headrers: {
					'content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			const response = await responseJSON.json();
			console.log('login data respose: ', response)
			return response;
		}catch(e){
			console.error(e)
		}
	}
);

export const signupThunk = createAsyncThunk(
  'users/getSignupStatus',
  async (body) => {
    try {
      console.log('in the signup Thunk function, body:', body);
      const responseJSON = await fetch('/user/signup',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const response = await responseJSON.json();
      console.log('signup data response: ', response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

const userSlice = createSlice({
	name: 'users',
	initialState: initialUserState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.fullfilled, (state, action) => {
				if(action.payload.loggedIn) {
          state.loggedIn = action.payload.loggedIn;
          state.username = action.payload.username;
          state.firstName = action.payload.firstName;
        }
			})
			.addCase(signupThunk.fulfilled, (state, action) => {
        console.log('In builder login, loggedIn:', action.payload);
        if(action.payload.loggedIn) {
          state.loggedIn = action.payload.loggedIn;
          state.username = action.payload.username;
          state.firstName = action.payload.firstName;
        }
      });
	}
})

export default userSlice.reducer