// fileActions.js

export const ADD_NODE = "ADD_NODE";
export const DELETE_NODE = "DELETE_NODE";
export const RENAME_NODE = "RENAME_NODE";
export const UPDATE_CONTENT = "UPDATE_CONTENT";

export const addNode = (folderId, itemName, isFolder) => ({
  type: ADD_NODE,
  payload: { folderId, itemName, isFolder },
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  payload: nodeId,
});

export const renameNode = (nodeId, newName) => ({
  type: RENAME_NODE,
  payload: { nodeId, newName },
});

export const updateContent = (nodeId, newContent) => ({
  type: UPDATE_CONTENT,
  payload: { nodeId, newContent },
});
