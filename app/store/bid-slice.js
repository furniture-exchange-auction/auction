import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialBidState = {
	currentBidPrice: ''
}

export const updateBid = createAsyncThunk(
	'api/updateBid',
	async (body) => {
		try {
			console.log('in the updateBid thunk function');
			const updateBid = await fetch('/api', {
				method: 'PUT',
				headers: {
					'Content-Type': 'Application/JSON'
				},
				body: JSON.stringify(body)
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
		builder.addCase(updateBid.fufilled, (state, action) => {
			if(typeof action.payload === 'string'){
				state.currentBidPrice = action.payload.currentBidPrice
			}
		})
	}
})

export default bidSlice.reducer;