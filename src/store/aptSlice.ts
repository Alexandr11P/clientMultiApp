import { PayloadAction, createSlice, original } from '@reduxjs/toolkit'

const initialState: { original: Apartment[], filtered: Apartment[] } =
    { original: [], filtered: [] }

const aptSlice = createSlice({
    name: 'aptSlice',
    initialState,
    reducers: {

        getApt(state, action: PayloadAction<Apartment[]>) {
            state.original = action.payload
            state.filtered = action.payload
        },

        priceSort(state, action: PayloadAction<boolean>) {
            action.payload
                ? state.filtered = state.filtered.slice(0).sort((b, a) => b.price - a.price)
                : state.filtered = state.filtered.slice(0).sort((a, b) => b.price - a.price)
        },

        etagSort(state, action: PayloadAction<boolean>) {
            action.payload
                ? state.filtered = state.filtered.slice(0).sort((b, a) => b.floor - a.floor)
                : state.filtered = state.filtered.slice(0).sort((a, b) => b.floor - a.floor)
        },

        roomsSort(state, action: PayloadAction<boolean>) {
            action.payload
                ? state.filtered = state.filtered.slice(0).sort((b, a) => b.rooms - a.rooms)
                : state.filtered = state.filtered.slice(0).sort((a, b) => b.rooms - a.rooms)
        },

        areaSort(state, action: PayloadAction<boolean>) {
            action.payload
                ? state.filtered = state.filtered.slice(0).sort((b, a) => b.area - a.area)
                : state.filtered = state.filtered.slice(0).sort((a, b) => b.area - a.area)
        },

        priceFilter(state, action: PayloadAction<{ from?: number, to?: number }>) {
            const from = action.payload.from || 0
            const to = action.payload.to || Infinity
            state.filtered = state.filtered.filter((e) => e.price >= from && e.price <= to)
        },

        etagFilter(state, action: PayloadAction<{ from?: number, to?: number }>) {
            const from = action.payload.from || 0
            const to = action.payload.to || Infinity
            state.filtered = state.filtered.filter((e) => e.floor >= from && e.floor <= to)
        },

        roomsFilter(state, action: PayloadAction<{ from?: number, to?: number }>) {
            const from = action.payload.from || 0
            const to = action.payload.to || Infinity
            state.filtered = state.filtered.filter((e) => e.rooms >= from && e.rooms <= to)
        },

        areaFilter(state, action: PayloadAction<{ from?: number, to?: number }>) {
            const from = action.payload.from || 0
            const to = action.payload.to || Infinity
            state.filtered = state.filtered.filter((e) => e.area >= from && e.area <= to)
        }
    }
})

export const {
    getApt,
    priceSort,
    etagSort,
    roomsSort,
    areaSort,
    priceFilter,
    etagFilter,
    roomsFilter,
    areaFilter } = aptSlice.actions

export default aptSlice