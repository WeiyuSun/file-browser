
export const FILE_TYPE = {
    FILE: 'file',
    FOLDER: 'folder'
}

export const MENU_ITEM_TYPE = {
    CREATE: 'Create',
    DELETE: 'Delete',
    RENAME: 'Rename',
    COPY: 'Copy',
    CUT: 'Cut',
    PASTE: 'Paste'
}

export const rootFolderKey = 'fe5ebf37-1cde-4ed9-92d1-e0e29c5ed5e0';
export const rootFolderTitle = 'root';

export const menuCreate = {
    label: MENU_ITEM_TYPE.CREATE,
    key: MENU_ITEM_TYPE.CREATE
}

export const menuDelete = {
    label: MENU_ITEM_TYPE.DELETE,
    key: MENU_ITEM_TYPE.DELETE
}

export const menuRename = {
    label: MENU_ITEM_TYPE.RENAME,
    key: MENU_ITEM_TYPE.RENAME
}

export const menuCopy = {
    label: MENU_ITEM_TYPE.COPY,
    key: MENU_ITEM_TYPE.COPY
}

export const menuPaste = {
    label: MENU_ITEM_TYPE.PASTE,
    key: MENU_ITEM_TYPE.PASTE,
}

export const menuCut = {
    label: MENU_ITEM_TYPE.CUT,
    key: MENU_ITEM_TYPE.CUT
}


export const rootMenuItems = [
    menuCreate,
    menuRename
]

export const folderMenuItems = [
    menuCreate,
    menuRename,
    menuDelete,
    menuCopy,
    menuCut
]

export const fileMenuItems = [
    menuRename,
    menuDelete,
    menuCopy,
    menuCut
]

export const rootMenuItemsWithPaste = [
    menuCreate,
    menuRename,
    menuPaste
]

export const folderMenuItemsWithPaste = [
    menuCreate,
    menuRename,
    menuDelete,
    menuCopy,
    menuPaste,
    menuCut
]

export const fileMenuItemsWithPaste = [
    menuRename,
    menuDelete,
    menuCopy,
    menuPaste,
    menuCut
]