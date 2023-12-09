// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import FileBrowser from "./components/fileBrowser";
import "./styles.css";

const STORAGE_KEY = "explorerData";

const App = () => {

  return (
    <Provider store={store}>
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar for File Browser */}
        <div style={{ width: "33%", padding: "20px", overflow: "auto", backgroundColor: "black", color: "white" }}>
          <h2>File Browser</h2>
          <FileBrowser />
        </div>

        {/* Main Content Area */}
        <div style={{ width: "67%", padding: "20px", overflow: "auto", backgroundColor: "#333333", color: "white" }}>
          {/* You can display the content of the selected file here */}
        </div>
      </div>
    </Provider>
  );
};

export default App;
