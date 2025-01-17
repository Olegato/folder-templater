import { v4 as uuidv4 } from "uuid";
import { DataType, FolderTree } from "../types/folder-tree.ts";
import { useFolderTreeStore } from "../store";

const createNodeTemplate = (label: FolderTree["label"], data: DataType) => {
  return {
    key: uuidv4(),
    label,
    data,
  };
};

export const useTreeActions = () => {
  const { tree, changeTree } = useFolderTreeStore();

  const addChildNode = (
    label: FolderTree["label"],
    editableNodeType: DataType,
    editableNodeKey: FolderTree["key"],
  ) => {
    changeTree(
      editTreeNode(tree, editableNodeKey, {
        children: [createNodeTemplate(label, editableNodeType)],
      }),
    );
  };

  const changeNodeLabel = (
    label: FolderTree["label"],
    editableNodeKey: FolderTree["key"],
  ) => {
    changeTree(editTreeNode(tree, editableNodeKey, { label }));
  };

  const editTreeNode = (
    tree: FolderTree[],
    key: FolderTree["key"],
    node?: FolderTree,
  ): FolderTree[] => {
    return tree.map((item) => {
      if (item.children) {
        item.children = editTreeNode(item.children, key, node);
      }
      if (item.key === key) {
        if (node?.children?.length && item?.children?.length) {
          return {
            ...item,
            children: [...item.children, ...node.children],
          };
        }
        return {
          ...item,
          ...node,
        };
      }
      return item;
    });
  };

  return {
    addChildNode,
    changeNodeLabel,
  };
};
