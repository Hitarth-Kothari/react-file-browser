// src/components/fileBrowser.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { insertNode, deleteNode, renameNode, saveContent } from "../redux/actions";

const FileBrowser = ({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  handleSaveContent,
  explorer,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExplorer, setFilteredExplorer] = useState(explorer?.items || []);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [matchedPath, setMatchedPath] = useState([]);

  const handleNewFolder = (isFolder) => {
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
    setContextMenu(null);
  };

  const onAddFolder = (value) => {
    handleInsertNode(explorer.id, value, showInput.isFolder);
    setShowInput({ ...showInput, visible: false });
  };

  const onDeleteNode = () => {
    if (explorer.id === "1") {
      alert("Cannot delete the root folder.");
      return;
    }

    handleDeleteNode(explorer.id);
    setContextMenu(null);
  };

  const onRenameNode = () => {
    const newName = prompt("Enter a new name:", explorer.name);
    if (newName !== null) {
      handleRenameNode(explorer.id, newName);
    }
    setContextMenu(null);
  };

  const onSaveContent = () => {
    const content = prompt("Enter file content:", explorer.content);
    if (content !== null) {
      handleSaveContent(explorer.id, content);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    if (explorer.isFolder) {
      setContextMenu({ x: e.clientX, y: e.clientY });
    } else {
      setContextMenu({ x: e.clientX, y: e.clientY, fileContextMenu: true });
    }
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const filterRecursive = (node, path = []) => {
    const isMatch = node.name.toLowerCase().includes(searchTerm);
    const newPath = [...path, node.id];

    if (isMatch) {
      newPath.forEach((nodeId) => {
        setExpandedNodes((prevExpanded) => ({
          ...prevExpanded,
          [nodeId]: true,
        }));
      });

      setMatchedPath(newPath);
    }

    if (node.items) {
      for (const item of node.items) {
        const result = filterRecursive(item, newPath);
        if (result) {
          return result;
        }
      }
    }

    return isMatch ? newPath : null;
  };

  const pruneItems = (node, pathToPrune) => {
    if (!node.items) {
      return node;
    }

    const prunedItems = node.items
      .map((item) => (isItemInPath(item, pathToPrune) ? pruneItems(item, pathToPrune) : null))
      .filter(Boolean);

    return { ...node, items: prunedItems };
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredExplorer(explorer?.items || []);
    setExpandedNodes({});
    setMatchedPath([]);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      clearSearch();
      return;
    }

    const matchedPath = explorer?.items
      .map((item) => filterRecursive(item))
      .filter(Boolean)[0];

    const prunedExplorer = pruneItems(explorer, matchedPath);

    const filteredData = prunedExplorer?.items[0];

    setFilteredExplorer([filteredData]);
  };

  const isItemInPath = (item, path) => {
    if (!path) return false;
    for (let i = 0; i < path.length; i++) {
      if (path[i] === item.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!explorer) {
      setExpand(false);
      setShowInput({ visible: false, isFolder: false });
      setContextMenu(null);
      setSearchTerm("");
      setFilteredExplorer([]);
      setExpandedNodes({});
      setMatchedPath([]);
      return;
    }
    setFilteredExplorer(explorer?.items || []);
  }, [explorer]);
  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest(".context-menu")) {
        closeContextMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div style={{ marginTop: 5, paddingLeft: 10 }}>
      {explorer?.id === "1" && (
        <input
          type="text"
          placeholder="Search files and folders..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 10 }}
        />
      )}

      <div
        onClick={() => setExpand(!expand)}
        onContextMenu={handleContextMenu}
        className={explorer?.isFolder ? "folder" : "file"}
      >
        <span>
          {explorer?.isFolder && (
            <span role="img" aria-label="folder" style={{ marginRight: 5 }}>
              {expand ? "🔽" : "▶️"}
            </span>
          )}
          {explorer?.isFolder ? "" : "📄"}
          {explorer && explorer.name}
        </span>
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {explorer?.isFolder && (
            <div onClick={() => handleNewFolder(true)}>Add Folder</div>
          )}
          {explorer?.isFolder && (
            <div onClick={() => handleNewFolder(false)}>Add File</div>
          )}
          {explorer?.id !== "1" && <div onClick={onDeleteNode}>Delete</div>}
          {explorer?.isFolder || <div onClick={onSaveContent}>Save Content</div>}
          <div onClick={onRenameNode}>Rename</div>
        </div>
      )}

      <div style={{ display: expand ? "block" : "none", paddingLeft: 2 }}>
        {showInput.visible && (
          <div className="inputContainer" style={{ marginLeft: 20 }}>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onKeyDown={(e) => e.keyCode === 13 && onAddFolder(e.target.value)}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              style={{ backgroundColor: "#ccc" }}
            />
          </div>
        )}

        {filteredExplorer.map((exp) => (
          <FileBrowser
            key={exp.id}
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleRenameNode={handleRenameNode}
            handleSaveContent={handleSaveContent}
            explorer={exp}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  explorer: state.explorer,
});

const mapDispatchToProps = (dispatch) => ({
  handleInsertNode: (folderId, item, isFolder) => dispatch(insertNode(folderId, item, isFolder)),
  handleDeleteNode: (nodeId) => dispatch(deleteNode(nodeId)),
  handleRenameNode: (nodeId, newName) => dispatch(renameNode(nodeId, newName)),
  handleSaveContent: (nodeId, content) => dispatch(saveContent(nodeId, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
