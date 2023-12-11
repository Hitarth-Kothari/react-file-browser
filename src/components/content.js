// src/components/FileContent.js
import React, { useState, useEffect } from "react";

const FileContent = ({ content, onSaveContent }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleToggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    onSaveContent(editedContent);
    setEditMode(false);
  };

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        {content !== null && (
        <button onClick={editMode ? handleSave : handleToggleEdit}>
          {editMode ? "Save" : "Edit"}
        </button>)}
      </div>

      {editMode ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
              width: "100%", 
              minHeight: "500px",
              backgroundColor: "#333333",
              color: "white", 
              padding: "10px",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#333333",
            color: "white",
            padding: "10px",
          }}
        >
          {editedContent}
        </div>
      )}
    </div>
  );
};

export default FileContent;
