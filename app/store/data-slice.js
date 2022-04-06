import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

/* 
Getting all items in db to store in items array
User sets Item name (title)
Checking to see if we got items from db
*/
const initialItemsState = {
	items: [],
	setItemName: '',
  gotItems: false,
}

export const syncItems = createAsyncThunk(
    'api/buyer',
    async () => {
      try {
        console.log('in the syncItems Thunk function');
        const responseJSON = await fetch('api/buyer');
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

  export const syncSellerItems = createAsyncThunk(
    'api/seller',
    async () => {
      try {
        console.log('in the syncItems Thunk function');
        const responseJSON = await fetch('api/seller');
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

export const addItem = createAsyncThunk(
  'api/seller',
  async (body) => {
    try {
      const addedIem = await fetch('api/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify(body),
      });
      console.log('added item', addedIem);
      return addedIem;
    } catch (e) {
      console.log(e);
    }
  }
);

// export const editItem = createAsyncThunk(
//     'api/items/editItem',
//     async (editBody) => {
//       try {
//         console.log('editBody',editBody);
//         console.log('in the editItem Thunk function');
//         const editItem = await fetch('api/items', {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'Application/JSON',
//           },
//           body: JSON.stringify(editBody),
//         });
//         console.log('out of the editItems Thunk function', editItem);
//         return editItem.status;
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   );

	export const deleteItem = createAsyncThunk(
  'api/seller',
  async (id) => {
    try {
      const deletedItem = await fetch(`api/seller/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON',
        },
      });
      console.log(deleteItem);
      return deletedItem.status;
    } catch (e) {
      console.log(e);
    }
  }
);

const itemReducer = createSlice({
	name: 'items',
	initialState: initialItemsState,
	reducers: {
		setItemName(state, action) {
			state.setItemName = action.payload;
		},
    setGotItems(state, action) {
      state.gotItems = true;
    },
	},
	extraReducers: (builder) => {
    builder.addCase(syncItems.fulfilled, (state, action) => {
      console.log('In builder ');
      console.log(action.payload)

      state.syncItems = action.payload;
    });
  }
})


export const itemActions = itemReducer.actions;

export default itemReducer.reducer;
