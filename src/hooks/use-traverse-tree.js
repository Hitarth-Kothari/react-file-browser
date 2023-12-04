const useTraverseTree = () => {
  // Add a file or folder in the tree
  // Can be optimized using Dynamic Programming
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let updatedItems = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: updatedItems };
  };

  // Delete a file or folder from the tree
  const deleteNode = function (tree, nodeId) {
    let updatedItems = tree.items.map((item) => {
      if (item.id === nodeId) {
        // Skip the item to delete
        return null;
      } else if (item.isFolder) {
        // Recursively delete from subfolders
        return { ...item, items: deleteNode(item, nodeId).items };
      }
      return item;
    }).filter(Boolean); // Remove null items
  
    return { ...tree, items: updatedItems };
  };

  // Rename a file or folder in the tree
  const renameNode = function (tree, nodeId, newName) {
    let updatedItems = tree.items.map((item) => {
      if (item.id === nodeId) {
        // Update the name of the item to rename
        return { ...item, name: newName };
      } else if (item.isFolder) {
        // Recursively rename in subfolders
        item.items = renameNode(item, nodeId, newName).items;
      }
      return item;
    });

    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
