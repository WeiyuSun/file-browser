import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'clipboard',
    initialState: {
        files: {}
    },
    reducers: {
        setClipboard: (state, actions) => {
             state.files = structuredClone(actions.payload.files)
        },

        clear: (state, actions) => {
            state.files = {}
        }
    }
})

export function currentClipboardContent(state) {
    return state.clipboard.files;
}


export default slice.reducer;
export const clipboardActions = slice.actions