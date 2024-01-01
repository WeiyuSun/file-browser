import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'fileFocusing',
    initialState: {key: '', title: ''},

    reducers: {
        setFile: (state, actions) => {
            state.key = actions.payload.key;
            state.title = actions.payload.title
        }
    }
})

export function currentFocusingFile(state) {
    return state.fileFocusing;
}


export default slice.reducer;
export const fileFocusingActions = slice.actions