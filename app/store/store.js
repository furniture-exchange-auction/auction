import { configureStore } from '@reduxjs/toolkit'
// Reducers
import userReducer from './users-slice'
import dataReducer from './data-slice'
import bidReducer from './bid-slice'

const store = configureStore({
	reducer: {
		users: userReducer,
		data: dataReducer,
		bid: bidReducer
	}
})

export default store