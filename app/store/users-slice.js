import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

/*
Checking to see if user is signed in
Setting username, firstname 
Adding all items for user in array
*/
const initialUserState = {
	loggedIn: false,
	username: '',
	firstName: '',
  userItems: []
};

export const loginThunk = createAsyncThunk(
	'users/getLoginStatus',
	async (body) => {
		try {
			console.log('in the login Thunk, body: ', body);
			const responseJSON = await fetch('/api/user/login', {
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
  'api/users/getSignupStatus',
  async (body) => {
    try {
      console.log('in the signup Thunk function, body:', body);
      const responseJSON = await fetch('/api/user/signup',{
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
      })
      .addCase(userItems.fulfilled, (state, action) => {
        console.log('In builder ');
        console.log(action.payload)

        state.userItems = action.payload;
    });
	}
})

export default userSlice.reducer