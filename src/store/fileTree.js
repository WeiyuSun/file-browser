import {v4 as uuid} from 'uuid';
import {createSlice} from "@reduxjs/toolkit";
import {FILE_TYPE, rootFolderKey, rootFolderTitle} from "../utils/type";

function getDefaultData() {
    if(localStorage.getItem('tree')){
        return JSON.parse(localStorage.getItem('tree'));
    }

    return [
        {
            title: rootFolderTitle,
            path: [-1],
            key: rootFolderKey,
            type: FILE_TYPE.FOLDER,
            children: []
        }
    ]
}

function traverseToFolder(root, path) {
    let folder = root[0];

    if (path[0] === -1) {
        return folder;
    }
    path.forEach((item) => {
        folder = folder.children[item]
    })

    return folder;
}

function regenerateKeyAndPath(targetFolder, srcFiles) {
    srcFiles.key = uuid();
    srcFiles.path = [...targetFolder.path, targetFolder.children.indexOf(srcFiles)];

    if (srcFiles.type === FILE_TYPE.FOLDER) {
        srcFiles.children.forEach((item) => {
            regenerateKeyAndPath(srcFiles, item);
        })
    }
}


const slice = createSlice({
    name: 'fileTree',
    initialState: getDefaultData(),
    reducers: {
        addNew: (files, action) => {
            const folder = traverseToFolder(files, action.payload.path);

            let path;
            if (folder.path[0] === -1) {
                path = [folder.children.length];
            } else {
                path = [...action.payload.path, folder.children.length];
            }


            folder.children.push({
                key: uuid(),
                title: action.payload.title,
                parent: folder.key,
                path,
                type: action.payload.type,
                children: (FILE_TYPE.FILE === action.payload.type) ? undefined : []
            })
            localStorage.setItem('tree', JSON.stringify(files))
        },
        remove: (files, action) => {
            const parentFolder = traverseToFolder(files, action.payload.path.slice(0, action.payload.path.length - 1))
            parentFolder.children = parentFolder.children.filter(item => item.key !== action.payload.target)
            for (let i = parentFolder.children.length - 1; i >= 0; i--) {
                const lastIndex = parentFolder.children[i].path.length - 1
                if (parentFolder.children[i].path[lastIndex] !== i) {
                    parentFolder.children[i].path[lastIndex] = i
                } else {
                    break;
                }
            }
            localStorage.setItem('tree', JSON.stringify(files))
            localStorage.removeItem(action.payload.target);
        },
        editName: (files, action) => {
            if (action.payload.target === files[0].key) {
                files[0].title = action.payload.title
            } else {
                const parentFolder = traverseToFolder(files, action.payload.path.slice(0, action.payload.path.length - 1))
                parentFolder.children = parentFolder.children.map(
                    item => (item.key === action.payload.target) ? {...item, title: action.payload.title} : item
                )
            }
            localStorage.setItem('tree', JSON.stringify(files))
        },

        pasteFiles: (files, action) => {
            const targetPath = action.payload.targetPath;
            console.log('targetPath', targetPath)
            const targetFolder = traverseToFolder(files, targetPath);
            // const srcFiles = JSON.parse(JSON.stringify(action.payload.srcFiles));
            const srcFiles = structuredClone(action.payload.srcFiles);
            targetFolder.children.push(srcFiles);
            regenerateKeyAndPath(targetFolder, srcFiles);
            localStorage.setItem('tree', JSON.stringify(files))
        }
    }

})


export function getFileTree(state) {
    return state.fileTree;
}

export default slice.reducer;
export const fileTreeActions = slice.actions