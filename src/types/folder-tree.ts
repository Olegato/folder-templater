import { TreeNode } from "primereact/treenode";

export interface FolderTree extends TreeNode {
  data?: DataType;
}

export type DataType = "folder" | "file" | "";
