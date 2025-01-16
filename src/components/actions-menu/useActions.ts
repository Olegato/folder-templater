import { useEditFormStore, useFolderTreeStore } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { DataType, FolderTree } from "../../types/folder-tree.ts";
import { useConfirmModalStore } from "../../store/confirmModalStore.ts";
import { useValidation } from "../edit-form/useValidation.ts";
import { useEffect } from "react";

const createNodeTemplate = (label: FolderTree["label"], data: DataType) => {
  return {
    key: uuidv4(),
    label,
    data,
  };
};

export const useActions = () => {
  const { tree, changeTree, setEditableState, editableState } =
    useFolderTreeStore();

  const { editableNodeKey, editableAction, editableNodeType } = editableState;
  const { setValue, setError, error } = useEditFormStore();
  const { handleVisibleModal } = useConfirmModalStore();
  const { validate } = useValidation();

  const initChangeName = (
    key: FolderTree["key"],
    currenName: FolderTree["label"],
  ) => {
    setValue(currenName || "");
    setEditableState(key, "edit");
  };

  const onChangeName = (newName: FolderTree["label"], type: DataType) => {
    const validateError = validate(newName, type);

    if (!validateError) {
      changeTree(onChangeNode(tree, editableNodeKey, { label: newName }));
      onResetChangeName();
    } else {
      setError(validateError);
    }
  };

  const onResetChangeName = () => {
    console.log("onCancel");
    setValue("");
    setEditableState("");
  };

  const initCreateNode = (key: FolderTree["key"], type: DataType) => {
    setEditableState(key, "create", type);
    handleVisibleModal();
  };

  const addChileNode = (label: FolderTree["label"]) => {
    changeTree(
      // onChangeNode(tree, key, { children: [createNodeTemplate("child")] }),
      onChangeNode(tree, editableNodeKey, {
        children: [createNodeTemplate(label, editableNodeType)],
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
