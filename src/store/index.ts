import { combineSlices, configureStore } from '@reduxjs/toolkit'
import backgroundSlice from './backgroundSlice'


export const makeStore = () => {
    return configureStore({
        reducer: combineSlices(backgroundSlice)
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']