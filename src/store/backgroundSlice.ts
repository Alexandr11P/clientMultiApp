import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { color: string } = { color: 'red' }

const backgroundSlice = createSlice({
    name: 'backgroundColor',
    initialState,
    reducers: {
        setBC: (state, action: PayloadAction<string>) => {
            state.color = action.payload
        }
    }
})

export const { setBC } = backgroundSlice.actions
export default backgroundSlice