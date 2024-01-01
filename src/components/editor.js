import CodeMirror from '@uiw/react-codemirror';
import {historyField} from '@codemirror/commands';
import {useSelector} from "react-redux";
import {currentFocusingFile} from "../store/fileFocusing";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {json} from '@codemirror/lang-json'



export default function EditorWithInitialState() {
    const currentFile = useSelector(state => currentFocusingFile(state));
    const value = localStorage.getItem(currentFile.key) || '//type any code here';


    return (
        <>
            {currentFile.key && <CodeMirror
                value={value}
                theme={vscodeDark}
                height={'100vh'}
                onChange={(value, viewUpdate) => {
                    localStorage.setItem(currentFile.key, value)
                }}
                extensions={[javascript({ jsx: true ,typescript: true}), json()]}
            />}
        </>


    )
}