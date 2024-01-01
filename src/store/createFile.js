import {createSlice} from "@reduxjs/toolkit";
import {FILE_TYPE} from "../utils/type";

const slice = createSlice({
    name: 'creatFile',
    initialState: {
        isCreating: false,
        title: '',
        fileType: FILE_TYPE.FILE,
        suffix: '.js',
        path: []
    },
    reducers: {
        setState: (state, action) => {
            state.isCreating = action.payload.state

            // file creation process cancelled or finished,
            // so, reset all state to default value
            if(!action.payload.state) {
                state.title = '';
                state.fileType = FILE_TYPE.FILE
                state.suffix = '.js'
                state.path = []
            }
        },
        setTitle: (state, action) => {
            state.title = action.payload.title
        },
        setFileType: (state, action) => {
            state.fileType = action.payload.fileType
        },
        setSuffix: (state, action) => {
            state.suffix = action.payload.suffix
        },
        setPath: (state, action) => {
            state.path = [...action.payload.path]
        }
    }
})

export function isCreatingFile(state) {
    return state.createFile.isCreating;
}

export function currentTitle(state) {
    return state.createFile.title;
}

export function currentFileType(state) {
    return state.createFile.fileType;
}

export function currentPath(state) {
    return state.createFile.path;
}

export function currentSuffix(state) {
    return state.createFile.suffix;
}



export default slice.reducer;
export const createFileActions = slice.actions