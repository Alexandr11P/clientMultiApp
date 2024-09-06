import { combineSlices, configureStore } from '@reduxjs/toolkit'
import aptSlice from './aptSlice'


export const makeStore = () => {
    return configureStore({
        reducer: combineSlices(aptSlice)
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']