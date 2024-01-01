import {Dropdown} from "antd";
import {
    FILE_TYPE,
    fileMenuItems,
    fileMenuItemsWithPaste,
    folderMenuItems,
    folderMenuItemsWithPaste,
    MENU_ITEM_TYPE,
    rootFolderKey,
    rootMenuItems,
    rootMenuItemsWithPaste
} from "../utils/type";
import React from "react";
import {createFileActions} from "../store/createFile";
import {useDispatch, useSelector} from "react-redux";
import {fileTreeActions} from "../store/fileTree";
import {renameTitleActions} from "../store/renameTitle";
import {clipboardActions, currentClipboardContent} from "../store/clipboard";
import { fileFocusingActions} from "../store/fileFocusing";

export default function Menu({data}) {
    const dispatch = useDispatch();

    const clipboardContent = useSelector(state => currentClipboardContent(state));
    function menuOnClick({key, domEvent}) {
        domEvent.preventDefault();
        domEvent.stopPropagation();
        domEvent.nativeEvent.stopImmediatePropagation();

        switch (key) {
            case MENU_ITEM_TYPE.CREATE:
                dispatch(createFileActions.setPath({path: data.path}))
                dispatch(createFileActions.setState({state: true}))
                break;
            case MENU_ITEM_TYPE.DELETE:
                dispatch(fileTreeActions.remove({
                    path: data.path,
                    target: data.key
                }))
                break;

            case MENU_ITEM_TYPE.RENAME:
                // console.log('data', data)
                dispatch(renameTitleActions.setPath({path: data.path}));
                dispatch(renameTitleActions.setTarget({target: data.key}));
                dispatch(renameTitleActions.setState({isEditing: true}));
                dispatch(renameTitleActions.setFileType({fileType: data.type}))
                break;

            case MENU_ITEM_TYPE.CUT:
                dispatch(clipboardActions.setClipboard({
                    files: data
                }));
                dispatch(fileTreeActions.remove({
                    path: data.path,
                    target: data.key
                }))
                break;

            case MENU_ITEM_TYPE.COPY:
                dispatch(clipboardActions.setClipboard({
                    files: data
                }));
                break;

            case MENU_ITEM_TYPE.PASTE:
                dispatch(fileTreeActions.pasteFiles({
                    targetPath: data.path,
                    srcFiles: clipboardContent
                }))
                break;
        }
    }

    function getMenuItems(data) {

        const isFile = data.type === FILE_TYPE.FILE;
        const isRoot = data.key === rootFolderKey;

        if (Object.keys(clipboardContent).length === 0)
            return (isFile) ? fileMenuItems : (isRoot ? rootMenuItems : folderMenuItems);
        return (isFile) ? fileMenuItemsWithPaste : (isRoot ? rootMenuItemsWithPaste : folderMenuItemsWithPaste);
    }

    return (
        <div>
            <Dropdown
                onClick={() => {
                    if (data.type === FILE_TYPE.FILE) {
                        dispatch(fileFocusingActions.setFile({
                            key: data.key,
                            title: data.title
                        }))
                    } else {
                        dispatch(fileFocusingActions.setFile({
                            key: '',
                            title: ''
                        }))
                    }


                }}
                menu={{
                    items: getMenuItems(data),
                    onClick: menuOnClick
                }}

                trigger={['contextMenu']}>
                <span className={'title-text'}>{data.title}</span>
            </Dropdown>
        </div>
    )
}