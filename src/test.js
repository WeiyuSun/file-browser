import {fileTreeActions, getFileTree} from "./store/fileTree";
import {useDispatch, useSelector} from "react-redux";
import {FILE_TYPE} from "./utils/type";
import {useEffect} from "react";
import {clipboardActions, currentClipboardContent} from "./store/clipboard";

// class Test extends Component {
export default function Test() {

    const dispatch = useDispatch();

    const fileTree = useSelector(state => getFileTree(state));
    const rootFile = fileTree[0];
    const otherFile = fileTree[0].children[0].children[4];
    const country = fileTree[0].children[0]
    const countryInfo = fileTree[0].children[1];


    useEffect(() => {
        dispatch(clipboardActions.setClipboard({
            files: country
        }))
    }, []);


    const clipBoardContent = useSelector(state => currentClipboardContent(state))


    // const targetPath = action.payload.targetPath;
    // const targetFolder = traverseToFolder(files, targetPath);
    // const srcFiles = structuredClone(action.payload.srcFiles);

    return (
        <>
            <button onClick={() => {
                dispatch(fileTreeActions.pasteFiles({
                    targetPath: rootFile.path,
                    srcFiles: clipBoardContent
                }))
            }}>
                add col
            </button>
            <pre>{JSON.stringify(rootFile, null, 4)}</pre>
            {/*<pre style={{color: 'red'}}>{JSON.stringify(country, null, 4)}</pre>*/}
        </>


    )
    // }
}
