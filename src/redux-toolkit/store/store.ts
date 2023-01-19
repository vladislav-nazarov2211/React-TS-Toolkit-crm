import { configureStore } from '@reduxjs/toolkit'
import filterSlice from '../slices/filterSlice'
import  registrSlice  from '../slices/registrSlice'

export const store = configureStore({
    reducer: {
        registrBid: registrSlice,
        filterBids: filterSlice
    }
})

export type RootState = ReturnType<typeof store.getState>