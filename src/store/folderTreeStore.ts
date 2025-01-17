import { create } from "zustand";
import { DataType, FolderTree } from "../types/folder-tree.ts";
import { v4 as uuidv4 } from "uuid";

interface FolderTreeState {
  tree: FolderTree[];
  editableState: EditableState;
}

interface EditableState {
  editableNodeKey: FolderTree["key"];
  editableAction: "create" | "edit" | "delete" | "";
  editableNodeType: DataType | "";
}

interface FolderTreeActions {
  changeTree: (newTree: FolderTree[]) => void;
  setEditableState: (
    key: EditableState["editableNodeKey"],
    action?: EditableState["editableAction"],
    type?: EditableState["editableNodeType"],
  ) => void;
  resetEditableState: () => void;
}

const mock: FolderTree = {
  key: uuidv4(),
  label: "Root Folder",
  children: [{ key: uuidv4(), label: "Child Folder 1", data: "folder" }],
  data: "folder",
};

const defaultEditableState: EditableState = {
  editableNodeKey: "",
  editableAction: "",
  editableNodeType: "",
};

export const useFolderTreeStore = create<FolderTreeState & FolderTreeActions>(
  (set) => ({
    tree: [mock],
    editableState: defaultEditableState,
    changeTree: (newTree) =>
      set(() => ({
        tree: [...newTree],
      })),
    setEditableState: (
      key: EditableState["editableNodeKey"],
      action: EditableState["editableAction"] = "",
      type: EditableState["editableNodeType"] = "",
    ) =>
      set(() => ({
        editableState: {
          editableNodeKey: key,
          editableAction: action,
          editableNodeType: type,
        },
      })),
    resetEditableState: () =>
      set(() => ({
        editableState: defaultEditableState,
      })),
  }),
);
