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
        <button onClick={editMode ? handleSave : handleToggleEdit}>
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
              width: "100%", // Make textarea fill the available width
              minHeight: "500px", // Set a minimum height or adjust as needed
              backgroundColor: "#333333", // Match the background color of the app
              color: "white", // Text color
              padding: "10px", // Padding for better aesthetics
            }}
          />
        </div>
      ) : (
        <div
          style={{
            whiteSpace: "pre-wrap", // Preserve both spaces and newline characters
            backgroundColor: "#333333", // Match the background color of the app
            color: "white", // Text color
            padding: "10px", // Padding for better aesthetics
          }}
        >
          {editedContent}
        </div>
      )}
    </div>
  );
};

export default FileContent;
