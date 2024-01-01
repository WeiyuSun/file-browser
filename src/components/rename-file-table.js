import {Input, Modal, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fileTreeActions} from "../store/fileTree";
import {
    currentEditingFileType,
    currentEditingPath,
    currentEditingSuffix,
    currentEditingTarget,
    currentEditingTitle,
    isEditingTitle,
    renameTitleActions
} from "../store/renameTitle";
import {createFileActions} from "../store/createFile";
import {FILE_TYPE} from "../utils/type";

const {Option} = Select;
export default function RenameFileTable() {
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
    const showTable = useSelector(state => isEditingTitle(state));
    const title = useSelector(state => currentEditingTitle(state));
    const path = useSelector(state => currentEditingPath(state));
    const target = useSelector(state => currentEditingTarget(state));
    const suffix = useSelector(state => currentEditingSuffix(state));
    const fileType = useSelector(state => currentEditingFileType(state));
    const dispatch = useDispatch();

    return (

        <Modal
            centered
            title={(<p>&nbsp;&nbsp;</p>)}
            open={showTable}
            okButtonProps={{
                disabled: title === '' || title.length >= 50
            }}
            onOk={() => {
                dispatch(fileTreeActions.editName({
                    path,
                    title: (fileType === FILE_TYPE.FILE) ? `${title}${suffix}` : title,
                    target
                }))
                dispatch(renameTitleActions.setState({status: false}))
            }}
            onCancel={() => {
                dispatch(renameTitleActions.setState({status: false}))
            }}
        >



            {fileType === FILE_TYPE.FILE && (
                <Input
                    value={title}
                    placeholder={'Input file name'}
                    addonAfter={suffixOpts}
                    onChange={(e) => {
                        dispatch(renameTitleActions.setTitle({title: e.target.value}))
                    }}
                />
            )}

            {fileType === FILE_TYPE.FOLDER && (
                <Input
                    value={title}
                    placeholder={'Input file name'}
                    onChange={(e) => {
                        dispatch(renameTitleActions.setTitle({title: e.target.value}))
                    }}
                />
            )}



            {title.length >= 50 && (<div>File/Folder name cannot over 50 characters</div>)}

        </Modal>
    )
}