import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from "./test";
import CreateFileTable from "./components/create-file-table";
import {Provider} from "react-redux";
import configStore from "./store/configStore";
import Editor from "./components/editor";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={configStore()}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);