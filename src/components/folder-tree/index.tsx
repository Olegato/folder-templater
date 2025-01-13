import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { useActions } from "../actions-menu/useActions.ts";
import { useFolderTreeStore } from "../../store";
import { TreeNode } from "primereact/treenode";

export const FolderTree = () => {
  const { onChangeFolder } = useActions();
  const { tree } = useFolderTreeStore();

  const renderNodeTemplate = (node: TreeNode) => {
    return (
      //todo нормально стилизовать
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>{node.label}</span>
        <Button
          label="Add Child"
          icon="pi pi-plus"
          className="p-button-text p-button-sm"
          onClick={() => onChangeFolder(node.key)}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Folder Tree with Actions</h1>
      <Tree
        value={tree}
        nodeTemplate={renderNodeTemplate}
        selectionMode="single"
        className="p-tree-container"
      />
    </div>
  );
};
