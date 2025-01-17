import { DataType, FolderTree } from "../types/folder-tree.ts";
import {
  useConfirmModalStore,
  useEditFormStore,
  useFolderTreeStore,
} from "../store";
import { useValidation } from "./useValidation.ts";
import { useTreeActions } from "./useTreeActions.ts";

export const useCrudActions = () => {
  const { setEditableState, editableState, resetEditableState } =
    useFolderTreeStore();

  const { setValue, setError, resetForm, value } = useEditFormStore();

  const { handleVisibleModal } = useConfirmModalStore();

  const { validateByType } = useValidation();
  const { addChildNode, changeNodeLabel } = useTreeActions();

  const { editableNodeKey, editableNodeType } = editableState;

  const initCreate = (key: FolderTree["key"], type: DataType) => {
    setEditableState(key, "create", type);
    handleVisibleModal();
  };

  const initChangeName = (
    key: FolderTree["key"],
    currenName: FolderTree["label"],
    type: DataType,
  ) => {
    setValue(currenName || "");
    setEditableState(key, "edit", type);
  };

  const onCreateNode = (
    type: DataType = editableNodeType,
    label: FolderTree["label"] = value,
  ) => {
    const validateError = validateByType(label, type);

    if (!validateError) {
      addChildNode(label, editableNodeType, editableNodeKey);
      onResetEdit();
      handleVisibleModal();
    } else {
      setError(validateError);
    }
  };

  const onChangeNodeLabel = (
    type: DataType = editableNodeType,
    label: FolderTree["label"] = value,
  ) => {
    const validateError = validateByType(label, type);

    if (!validateError) {
      changeNodeLabel(label, editableNodeKey);
      onResetEdit();
    } else {
      setError(validateError);
    }
  };

  const onResetEdit = () => {
    resetForm();
    resetEditableState();
  };

  return {
    initCreate,
    initChangeName,
    onChangeNodeLabel,
    onResetEdit,
    onCreateNode,
  };
};
