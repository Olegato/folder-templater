import { create } from "zustand";
import { DataType, FolderTree } from "../types/folder-tree.ts";
import { v4 as uuidv4 } from "uuid";

interface FolderTreeState {
  tree: FolderTree[];
  editableState: EditableState;
}

interface EditableState {
  editableNodeKey: FolderTree["key"];
  editableAction: "create" | "edit" | "delete" | null;
  editableNodeType: DataType | null;
}

interface FolderTreeActions {
  changeTree: (newTree: FolderTree[]) => void;
  setEditableState: (
    key: EditableState["editableNodeKey"],
    action?: EditableState["editableAction"],
    type?: EditableState["editableNodeType"],
  ) => void;
}

const mock: FolderTree = {
  key: uuidv4(),
  label: "Root Folder",
  children: [{ key: uuidv4(), label: "Child Folder 1" }],
  data: "folder",
};

export const useFolderTreeStore = create<FolderTreeState & FolderTreeActions>(
  (set) => ({
    tree: [mock],
    editableState: {
      editableNodeKey: "",
      editableAction: null,
      editableNodeType: null,
    },
    changeTree: (newTree) =>
      set(() => ({
        tree: [...newTree],
      })),
    setEditableState: (
      key: EditableState["editableNodeKey"],
      action: EditableState["editableAction"] = null,
      type: EditableState["editableNodeType"] = null,
    ) =>
      set(() => ({
        editableState: {
          editableNodeKey: key,
          editableAction: action,
          editableNodeType: type,
        },
      })),
  }),
);
