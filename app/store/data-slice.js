import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialItemsState = {
	items: [],
	setItemName: '',
  gotItems: false,
}

export const syncItems = createAsyncThunk(
    'api/items/syncItems',
    async () => {
      try {
        console.log('in the syncItems Thunk function');
        const responseJSON = await fetch('api/items');
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
  'api/items/addItem',
  async (body) => {
    try {
      const addedIem = await fetch('api/items', {
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

export const editItem = createAsyncThunk(
    '/items/editItem',
    async (editBody) => {
      try {
        console.log('editBody',editBody);
        console.log('in the editRecipes Thunk function');
        const editItem = await fetch('api/items', {
          method: 'PUT',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: JSON.stringify(editBody),
        });
        console.log('out of the editItems Thunk function', editItem);
        return editItem.status;
      } catch (e) {
        console.log(e);
      }
    }
  );

	export const deleteItem = createAsyncThunk(
  '/items/deleteItem',
  async (id) => {
    try {
      const deletedItem = await fetch(`api/items/${id}`, {
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

      state.recipes = action.payload;
    });
  }
})


export const itemActions = itemReducer.actions;

export default itemReducer.reducer;
