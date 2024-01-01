import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'renameTitle',
    initialState: {
        isEditing: false,
        path: [],
        title: '',
        target: '',
        suffix: '.js',
        type: ''
    },
    reducers: {
        setState: (state, actions) => {
            state.isEditing = actions.payload.isEditing

            if(!actions.payload.isEditing) {
                state.title = '';
                state.path = [];
                state.target = '';
                state.suffix = '.js';
                state.type = ''
            }
        },

        setTitle: (state, actions) => {
            state.title = actions.payload.title
        },

        setPath: (state, action) => {
            state.path = [...action.payload.path]
        },

        setTarget: (state, action) => {
            state.target = action.payload.target
        },
        setSuffix: (state, action) => {
            state.suffix = action.payload.suffix
        },

        setFileType: (state, action) => {
            state.fileType = action.payload.fileType
        }
    }
})

export function isEditingTitle(state) {
    return state.renameTitle.isEditing;
}

export function currentEditingTitle(state) {
    return state.renameTitle.title;
}

export function currentEditingPath(state) {
    return state.renameTitle.path;
}

export function currentEditingTarget(state) {
    return state.renameTitle.target;
}

export function currentEditingSuffix(state) {
    return state.renameTitle.suffix;
}

export function currentEditingFileType(state) {
    return state.renameTitle.fileType
}
export default slice.reducer;
export const renameTitleActions = slice.actions