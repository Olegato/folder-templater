import { create } from "zustand";
import { FolderTree } from "../types/folder-tree.ts";
import { v4 as uuidv4 } from "uuid";

interface FolderTreeState {
  tree: FolderTree[];
  editableNodeKey: FolderTree["key"];
}

interface FolderTreeActions {
  changeFolder: (newTree: FolderTree[]) => void;
  setEditableNodeKey: (key: FolderTreeState["editableNodeKey"]) => void;
}

const mock = {
  key: uuidv4(),
  label: "Root Folder",
  children: [{ key: uuidv4(), label: "Child Folder 1" }],
};

export const useFolderTreeStore = create<FolderTreeState & FolderTreeActions>(
  (set) => ({
    tree: [mock],
    editableNodeKey: "",
    changeFolder: (newTree) =>
      set(() => ({
        tree: [...newTree],
      })),
    setEditableNodeKey: (key: FolderTreeState["editableNodeKey"]) =>
      set(() => ({ editableNodeKey: key })),
  }),
);
