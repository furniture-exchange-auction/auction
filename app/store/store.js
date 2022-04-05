import { configureStore } from '@reduxjs/toolkit'
// Reducers
import userReducer from './users-slice'

const store = configureStore({
	reducer: {
		users: userReducer
	}
})

export default store