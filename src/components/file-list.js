import React, {useEffect} from 'react';
import {Input, Tree} from 'antd';
import {getFileTree} from "../store/fileTree";
import {useSelector} from "react-redux";
import Menu from "./menu";
import {DownOutlined, FileTextOutlined, FolderOutlined} from "@ant-design/icons";
import {FILE_TYPE} from "../utils/type";

const {Search} = Input;
const {DirectoryTree} = Tree;

export const FileList = () => {
    const treeData = useSelector(state => getFileTree(state))

    let shownData = [];
    function addIcon(data) {
        data.icon = (data.type === FILE_TYPE.FILE) ? (<FileTextOutlined />) : (<FolderOutlined />)

        if(data.children) {
            data.children.forEach((item) => {
                addIcon(item)
            })
        }
    }
    shownData = JSON.parse(JSON.stringify(treeData))
    addIcon(shownData[0])
    useEffect(() => {
        shownData = JSON.parse(JSON.stringify(treeData))
        addIcon(shownData[0])
    }, treeData);

    return (
        <div>
            <Search
                style={{
                    marginBottom: 8,
                }}

                placeholder="Search file keywords"
            />
            <DirectoryTree
                showLine
                switcherIcon={<DownOutlined />}
                rootStyle={{
                    textAlign: 'left',
                    borderRadius: 0,
                    background: 'white'
                }}
                blockNode={true}
                treeData={shownData}
                titleRender={(data) => {
                    return (
                        <Menu data={data}/>
                    )
                }}
            />

        </div>
    );
};
export default FileList;
