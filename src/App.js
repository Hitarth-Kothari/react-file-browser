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

  // Callback function to handle content selection
  const handleContentSelection = (content, nodeId) => {
    setSelectedNodeId(nodeId);
    setSelectedFileContent(content);
  };

  // Callback function to handle content saving
  const handleSaveContent = (content) => {
    // Save content to local storage
    localStorage.setItem(STORAGE_KEY, content);
    // Update the selected content state
    setSelectedFileContent(content);
    // Dispatch the Redux action to update the content in the store
    store.dispatch(saveContent(selectedNodeId, content));
  };

  return (
    <Provider store={store}>
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar for File Browser */}
        <div style={{ width: "33%", padding: "20px", overflow: "auto", backgroundColor: "black", color: "white" }}>
          <h2>File Browser</h2>
          {/* Pass the callback functions to FileBrowser */}
          <FileBrowser onContentSelect={handleContentSelection} />
        </div>

        {/* Main Content Area */}
        <div style={{ width: "67%", padding: "20px", overflow: "auto", backgroundColor: "#333333", color: "white" }}>
          {/* Display the content of the selected file */}
          <FileContent content={selectedFileContent} onSaveContent={handleSaveContent} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
