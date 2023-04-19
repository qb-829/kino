// This kinoSlice.js file makes use of the Redux Toolkit to
// set the inital states of the variables data, currentDrawNumber,
// page, and hasMore It also holds the actions to be Dispatched
// in GetKino.jsx to update the states.
// Axios is used to make the API call to retrieve the Kino data.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initialize kinoSlice
export const kinoSlice = createSlice({
  name: `kino`,
  initialState: {
    data: [],
    currentDrawNumber: null,
    page: 1,
    hasMore: true,
  },
  // Reducer object holds the actions that will update the states of
  // data, currentDrawNumber, page, and hasMore
  reducers: {
    setData: (state, action) => {
      state.data = [...state.data, ...action.payload];
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

// loadDraw function make the API call to get and set the draw
// data, currentDrawNumber and hasMore
export const loadDraw = () => async (dispatch, getState) => {
  const { page, currentDrawNumber } = getState().kino;
  const web = `https://puertorico.secondchancebonuszone.com/kino/past_drawings.php`;

  try {
    const res = await axios.get(web, {
      params: {
        drawid: currentDrawNumber,
        number: 20,
        sort: `desc`,
        page: page,
      },
    });
    const newData = res.data || [];

    // Console logs to verify information is being retreived and available
    console.log(newData);
    console.log(newData[0].gameNumber);
    dispatch(setCurrentDrawNumber(newData[0].gameNumber));
    dispatch(setData([newData]));
    dispatch(setHasMore(newData.length > 0));
  } catch (error) {
    console.log(error);
  }
};

// Export statement to make actions available for Dispatch
export const { setData, setCurrentDrawNumber, setPage, setHasMore } =
  kinoSlice.actions;

// Export the reducer function
export default kinoSlice.reducer;
