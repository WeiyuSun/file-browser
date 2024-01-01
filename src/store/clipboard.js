import {createSlice} from "@reduxjs/toolkit";

function deepCopyExcludingIcon(obj) {
    if (Array.isArray(obj)) {
        return obj.map(deepCopyExcludingIcon);
    } else if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && key !== 'icon') {
                newObj[key] = deepCopyExcludingIcon(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
}

const slice = createSlice({
    name: 'clipboard',
    initialState: {
        files: {}
    },
    reducers: {
        setClipboard: (state, actions) => {
            state.files = deepCopyExcludingIcon(actions.payload.files);
        },

        clear: (state) => {
            state.files = {}
        }
    }
})

export function currentClipboardContent(state) {
    return state.clipboard.files;
}

export default slice.reducer;
export const clipboardActions = slice.actions