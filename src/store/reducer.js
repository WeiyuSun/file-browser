import {combineReducers} from "redux";
import fileTreeReducer from "./fileTree";
import createFileReducer from "./createFile"
import renameTitleReducer from "./renameTitle";
import clipboardReducer from "./clipboard";
import fileFocusingReducer from './fileFocusing'

export default combineReducers({
    fileTree: fileTreeReducer,
    createFile: createFileReducer,
    renameTitle: renameTitleReducer,
    clipboard: clipboardReducer,
    fileFocusing: fileFocusingReducer
})