import { useState } from "react";
import FileBrowser from "./components/fileBrowser";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css"; // Assuming this is your main stylesheet
import explorer from "./data/folderData";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId) => {
    const finalTree = deleteNode(explorerData, nodeId);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (nodeId, newName) => {
    const finalTree = renameNode(explorerData, nodeId, newName);
    setExplorerData(finalTree);
  };

  return (
    <div className="App" style={{ display: "flex", height: "100vh"}}>
      {/* Sidebar for File Browser */}
      <div style={{ width: "33%", padding: "20px", overflow: "auto", backgroundColor: "black", color: "white" }}>
        <h2>File Browser</h2>
        <FileBrowser
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleRenameNode={handleRenameNode}
          explorer={explorerData}
        />
      </div>

      {/* Main Content Area */}
      <div style={{ width: "67%", padding: "20px", overflow: "auto" , backgroundColor: "#333333", color: "white" }}>
      </div>
    </div>
  );
}
