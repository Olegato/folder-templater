import { useEditFormStore, useFolderTreeStore } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { FolderTree } from "../../types/folder-tree.ts";
import { useConfirmModalStore } from "../../store/confirmModalStore.ts";

const createNodeTemplate = (label: FolderTree["label"]) => {
  return {
    key: uuidv4(),
    label,
  };
};

export const useActions = () => {
  const { tree, changeTree, setEditableState, editableState } =
    useFolderTreeStore();
  const { editableNodeKey, editableAction, editableNodeType } = editableState;
  const { setValue } = useEditFormStore();
  const { handleVisibleModal } = useConfirmModalStore();

  const initChangeName = (
    key: FolderTree["key"],
    currenName: FolderTree["label"],
  ) => {
    setValue(currenName || "");
    setEditableState(key, "edit");
  };

  const onChangeName = (newName: FolderTree["label"]) => {
    changeTree(onChangeNode(tree, editableNodeKey, { label: newName }));
    onResetChangeName();
  };

  const onResetChangeName = () => {
    console.log("onCancel");
    setValue("");
    setEditableState("");
  };

  const initCreateNode = (key: FolderTree["key"]) => {
    setEditableState(key);
    handleVisibleModal();
  };

  const addFileNode = () => {};

  const addChileNode = (label: FolderTree["label"]) => {
    //инпут автофокус
    changeTree(
      // onChangeNode(tree, key, { children: [createNodeTemplate("child")] }),
      onChangeNode(tree, editableNodeKey, {
        children: [createNodeTemplate(label)],
        // expanded: true,
      }),
    );
  };

  const onChangeNode = (
    tree: FolderTree[],
    key: FolderTree["key"],
    node?: FolderTree,
  ): FolderTree[] => {
    return tree.map((item) => {
      if (item.children) {
        item.children = onChangeNode(item.children, key, node);
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
    addChileNode,
    initCreateNode,
    initChangeName,
    onResetChangeName,
    onChangeName,
  };
};
