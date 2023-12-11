// src/redux/actions.js
export const INSERT_NODE = "INSERT_NODE";
export const DELETE_NODE = "DELETE_NODE";
export const RENAME_NODE = "RENAME_NODE";
export const UPDATE_CONTENT = "UPDATE_CONTENT"; // Add this line

export const insertNode = (folderId, itemName, isFolder) => ({
  type: INSERT_NODE,
  payload: { folderId, itemName, isFolder },
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  payload: { nodeId },
});

export const renameNode = (nodeId, newName) => ({
  type: RENAME_NODE,
  payload: { nodeId, newName },
});

export const saveContent = (nodeId, newContent) => ({
  type: UPDATE_CONTENT,
  payload: { nodeId, newContent },
});
