import React from 'react';
import './index.css';
import {Flex, Layout} from 'antd';
import FileList from "./components/file-list";
import CreateFileTable from "./components/create-file-table";
import RenameFileTable from "./components/rename-file-table";
import Editor from "./components/editor";

const { Sider, Content} = Layout;
const contentStyle = {
    textAlign: 'left',
    backgroundColor: '#1f1f1f',
};
const siderStyle = {
    minWidth: '150px',
    textAlign: 'center',
    background:'#201c1c',
    overflow: 'scroll',
};
const layoutStyle = {
    minHeight: '100vh',
    minWidth: '100vw',
    borderRadius: 0,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};
const App = () => {
    return (
        <>
            <Flex gap="small" wrap="wrap">
                <Layout style={layoutStyle}>
                    <Layout>
                        <Sider width={'300px'} style={siderStyle}>
                            <FileList/>
                        </Sider>
                        <Content style={contentStyle}>
                            <Editor />
                        </Content>
                    </Layout>
                </Layout>
            </Flex>

            <CreateFileTable />
            <RenameFileTable />
        </>
    )

}
export default App;
