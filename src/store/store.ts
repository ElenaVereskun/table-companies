import { configureStore } from "@reduxjs/toolkit"
import companySlice from "./company"

export const store = configureStore({
  reducer: {
    company: companySlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
