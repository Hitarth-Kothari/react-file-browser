import React, { useState, useEffect } from "react";

const FileBrowser = ({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  explorer,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExplorer, setFilteredExplorer] = useState(explorer.items || []);

  const handleNewFolder = (isFolder) => {
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
    setContextMenu(null); // Close context menu
  };

  const onAddFolder = (value) => {
    handleInsertNode(explorer.id, value, showInput.isFolder);
    setShowInput({ ...showInput, visible: false });
  };

  const onDeleteNode = () => {
    // Check if the node being deleted is the root
    if (explorer.id === "1") {
      alert("Cannot delete the root folder.");
      return;
    }

    // Proceed with deletion for non-root nodes
    handleDeleteNode(explorer.id);
    setContextMenu(null); // Close context menu after deleting
  };

  const onRenameNode = () => {
    const newName = prompt("Enter a new name:", explorer.name);
    if (newName !== null) {
      handleRenameNode(explorer.id, newName);
    }
    setContextMenu(null); // Close context menu after renaming
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    if (explorer.isFolder) {
      // Show all options for folders
      setContextMenu({ x: e.clientX, y: e.clientY });
    } else {
      // Show only delete and rename options for files
      setContextMenu({ x: e.clientX, y: e.clientY, fileContextMenu: true });
    }
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the explorer data based on the search term
    const filteredData = explorer.items.filter(
      (item) => item.name.toLowerCase().includes(term)
    );
    setFilteredExplorer(filteredData);
  };

  useEffect(() => {
    setFilteredExplorer(explorer.items || []);
  }, [explorer]);

  return (
    <div style={{ marginTop: 5, paddingLeft: 10 }}>
      {explorer.id === "1" && (
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
        className={explorer.isFolder ? "folder" : "file"} // Dynamically assign class
      >
        <span>
          {explorer.isFolder && (
            <span role="img" aria-label="folder" style={{ marginRight: 5 }}>
              {expand ? "🔽" : "▶️"}
            </span>
          )}
          {explorer.isFolder ? "" : "📄"}
          {explorer && explorer.name}
        </span>
      </div>

      {contextMenu && (
        <div
          className="context-menu" // Apply the context-menu class
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {explorer.isFolder && (
            <div onClick={() => handleNewFolder(true)}>Add Folder</div>
          )}
          {explorer.isFolder && (
            <div onClick={() => handleNewFolder(false)}>Add File</div>
          )}
          {explorer.id !== "1" && <div onClick={onDeleteNode}>Delete</div>}
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
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleRenameNode={handleRenameNode}
            key={exp.id}
            explorer={exp}
          />
        ))}
      </div>
    </div>
  );
};

export default FileBrowser;
