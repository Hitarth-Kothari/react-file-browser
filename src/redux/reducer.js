import * as actionTypes from "./actions";
import explorerData from "../data/folderData";

const initialState = {
  items: JSON.parse(localStorage.getItem("fileTree")) || [explorerData],
};

const insertNode = (tree, folderId, itemName, isFolder) => {
  if (tree.id === folderId && tree.isFolder) {
    const updatedTree = {
      ...tree,
      items: [
        {
          id: new Date().getTime(),
          name: itemName,
          isFolder: isFolder,
          content: isFolder ? "" : "Hello World",
          items: [],
        },
        ...tree.items,
      ],
    };
    localStorage.setItem("fileTree", JSON.stringify(updatedTree.items));
    return updatedTree;
  }

  const updatedTree = {
    ...tree,
    items: tree.items.map((ob) => insertNode(ob, folderId, itemName, isFolder)),
  };
  localStorage.setItem("fileTree", JSON.stringify(updatedTree.items));
  return updatedTree;
};


const deleteNode = (tree, nodeId) => {
  let updatedItems = tree.items.map((item) => {
    if (item.id === nodeId) {
      return null;
    } else if (item.isFolder) {
      return { ...item, items: deleteNode(item, nodeId).items };
    }
    return item;
  }).filter(Boolean);
  const updatedTree = { ...tree, items: updatedItems }
  localStorage.setItem("fileTree", JSON.stringify(updatedTree.items));
  return updatedTree;
};

const renameNode = (tree, nodeId, newName) => {
  const updatedTree = {
    ...tree,
    items: tree.items.map((item) =>
      item.id === nodeId
        ? { ...item, name: newName }
        : { ...item, items: renameNode(item, nodeId, newName).items }
    ),
  };
  localStorage.setItem("fileTree", JSON.stringify(updatedTree.items));
  return updatedTree;
};

const updateContent = (tree, nodeId, newContent) => {
  const updatedTree = {
    ...tree,
    items: tree.items.map((item) =>
      item.id === nodeId
        ? { ...item, content: newContent }
        : { ...item, items: updateContent(item, nodeId, newContent).items }
    ),
  };
  localStorage.setItem("fileTree", JSON.stringify(updatedTree.items));
  return updatedTree;
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INSERT_NODE:
      return { ...state, items: insertNode(state, action.payload.folderId, action.payload.itemName, action.payload.isFolder).items };

    case actionTypes.DELETE_NODE:
      return { ...state, items: deleteNode(state, action.payload).items };

    case actionTypes.RENAME_NODE:
      return { ...state, items: renameNode(state, action.payload.nodeId, action.payload.newName).items };

    case actionTypes.UPDATE_CONTENT:
      return { ...state, items: updateContent(state, action.payload.nodeId, action.payload.newContent).items };

    default:
      return state;
  }
};

export default fileReducer;
