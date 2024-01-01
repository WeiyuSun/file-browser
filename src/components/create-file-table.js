import {Input, Modal, Select, Switch} from "antd";
import {
    createFileActions,
    currentFileType,
    currentPath,
    currentSuffix,
    currentTitle,
    isCreatingFile
} from '../store/createFile'
import {useDispatch, useSelector} from "react-redux";
import {FILE_TYPE} from "../utils/type";
import {fileTreeActions} from "../store/fileTree";

const {Option} = Select;

export default function CreateFileTable() {
    const showTable = useSelector(state => isCreatingFile(state));
    const title = useSelector(state => currentTitle(state));
    const fileType = useSelector(state => currentFileType(state));
    const path = useSelector(state => currentPath(state));
    const suffix = useSelector(state => currentSuffix(state));
    const dispatch = useDispatch();

    const suffixOpts = (
        <Select
            size={'large'}
            defaultValue={'.js'}
            onChange={(value) => {
                dispatch(createFileActions.setSuffix({suffix: value}))
            }}
        >
            <Option value=".js">.js&nbsp;&nbsp;</Option>
            <Option value=".ts">.ts&nbsp;&nbsp;</Option>
            <Option value=".txt ">.txt&nbsp;</Option>
            <Option value=".json">.json</Option>
        </Select>
    );
    return (

        <Modal
            title={(<p>&nbsp;&nbsp;</p>)}
            centered
            open={showTable}
            okButtonProps={{
                disabled: title === '' || title.length >= 50
            }}
            onOk={() => {
                dispatch(fileTreeActions.addNew({
                    title: (fileType === FILE_TYPE.FILE) ? `${title}${suffix}` : title,
                    type: fileType,
                    path
                }))
                dispatch(createFileActions.setState({status: false}))
            }}
            onCancel={() => {
                dispatch(createFileActions.setState({status: false}))
            }}
        >
            <p className={'text-xl mb-2'}>
                File&nbsp;
                <Switch
                    onClick={(checked, event) => {
                        dispatch(createFileActions.setFileType({
                            fileType: (checked) ? FILE_TYPE.FOLDER : FILE_TYPE.FILE
                        }))
                    }}
                    value={fileType !== FILE_TYPE.FILE}
                    defaultValue={false}/>
                &nbsp;Folder
            </p>

            {fileType === FILE_TYPE.FILE && (
                <Input
                    onChange={(e) => {
                        dispatch(createFileActions.setTitle({title: e.target.value}))
                    }}
                    placeholder={'Input file name'}
                    addonAfter={suffixOpts}
                    value={title}
                />)}

            {fileType === FILE_TYPE.FOLDER && (
                <Input
                    onChange={(e) => {
                        dispatch(createFileActions.setTitle({title: e.target.value}))
                    }}
                    placeholder={'Input folder name'}
                    value={title}
                />)}

            {title.length >= 50 && (<div>File/Folder name cannot over 50</div>)}

        </Modal>
    )
}