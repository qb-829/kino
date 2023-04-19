import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const kinoSlice = createSlice({
    name: `kino`,
    initialState: {
        data: [],
        currentDrawNumber: null,
        page: 1,
        hasMore: true,
    },
    reducers: {
        setData: (state, action) => {
            state.data = [...state.data, ...action.payload]
        },
        setCurrentDrawNumber: (state, action) => {
            state.currentDrawNumber = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
    },

});

export const { setData, setCurrentDrawNumber, setPage, setHasMore } = kinoSlice.actions;

export const loadDraw = () => async (dispatch, getState) => {
    const { page, currentDrawNumber } = getState().kino;
    const web = `https://puertorico.secondchancebonuszone.com/kino/past_drawings.php`;

    try {
        const res = await axios.get(web, {
            params: {
                drawid: currentDrawNumber,
                number: 20,
                sort: `asc`,
                page: page,
            },
        });
        const newData = res.data || [];
        console.log(newData)
        console.log(newData[0].gameNumber)
        dispatch(setData(...newData))
        dispatch(setHasMore(newData.length > 0));
    } catch (error) {
        console.log(error)
    }


}

export default kinoSlice.reducer;