import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialBidState = {
	currentBidPrice: ''
}

export const updateBid = createAsyncThunk(
	'api/items/updateBid',
	async (price, id) => {
		try {
			console.log('in the updateBid thunk function');
			const updateBid = await fetch(`/api/items/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/JSON'
				},
				body: JSON.stringify(price)
			});
			return updateBid;
		} catch (e) {
			console.log(e)
		}
	}
)

const bidSlice = createSlice({
	name: 'updateBid',
	initialState: initialBidState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(updateBid.fulfilled, (state, action) => {
			if(typeof action.payload === 'string'){
				state.currentBidPrice = action.payload.currentBidPrice
			}
		})
	}
})

export default bidSlice.reducer;