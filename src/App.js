// src/App.js
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import FileBrowser from "./components/fileBrowser";
import FileContent from "./components/content";
import { UPDATE_CONTENT, saveContent } from "./redux/actions";
import "./styles.css";

const STORAGE_KEY = "explorerData";

const App = () => {
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const handleContentSelection = (content, nodeId, itemName) => {
    const fileExtensionsWithContent = ["txt", "js", "ts", "json"];
    const fileExtension = itemName.split(".").pop().toLowerCase();
    if (fileExtensionsWithContent.includes(fileExtension)){
      setSelectedNodeId(nodeId);
      setSelectedFileContent(content);
    }
    else{
      console.log('2');
      setSelectedNodeId('');
      setSelectedFileContent(null);
    }
  };

  const handleSaveContent = (content) => {
    if (selectedNodeId !== ''){ 
    localStorage.setItem(STORAGE_KEY, content);
    setSelectedFileContent(content);
    store.dispatch(saveContent(selectedNodeId, content));
  }
  };

  return (
    <Provider store={store}>
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "33%", padding: "20px", overflow: "auto", backgroundColor: "black", color: "white" }}>
          <h2>File Browser</h2>
          <FileBrowser onContentSelect={handleContentSelection} />
        </div>
        <div style={{ width: "67%", padding: "20px", overflow: "auto", backgroundColor: "#333333", color: "white" }}>
          <FileContent content={selectedFileContent} onSaveContent={handleSaveContent} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
