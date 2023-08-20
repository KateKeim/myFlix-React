import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const moviesSlice = createSlice({
    name: "movies",
    initialState: [],
    reducers: {
        setMovies: (state, action) => {
           
            state.push( ...action.payload)
      
        }
    }
});

export const MainView = () => {
    const movies = useSelector((state) => state.movies);
    const user = useSelector((state) => state.user);
}
export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;