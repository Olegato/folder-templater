import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import { useFolderTreeStore } from "../../store";
import { TreeNode } from "primereact/treenode";
import { EditForm } from "../edit-form";
import cn from "classnames";
import { useCrudActions } from "../../hooks/useCrudActions.ts";

export const FolderTree = () => {
  const { tree, editableState } = useFolderTreeStore();
  const { onChangeNodeLabel, initCreate, initChangeName } = useCrudActions();
  const { editableNodeKey, editableAction } = editableState;

  const renderNodeTemplate = (node: TreeNode) => {
    return (
      //todo нормально стилизовать
      <div className={"flex align-items-center gap-2"}>
        <i
          className={cn("pi", {
            "pi-folder": node.data === "folder",
            "pi-file": node.data === "file",
          })}
        ></i>
        {(editableNodeKey !== node.key || editableAction !== "edit") && (
          <span>{node.label}</span>
        )}
        {editableNodeKey === node.key && editableAction === "edit" && (
          <div
            className="p-inputgroup flex-1"
            // onBlur={onCancelChangeName}
          >
            <EditForm />
            {/*заменить бюаттон на див*/}
            <Button
              icon="pi pi-check"
              className="p-button-success"
              onClick={() => onChangeNodeLabel()}
            />
          </div>
        )}
        {node.data === "folder" && (
          <>
            <Button
              label="Add folder"
              icon="pi pi-plus"
              className="p-button-text p-button-sm"
              onClick={() => initCreate(node.key, "folder")}
            />
            <Button
              label="Add file"
              icon="pi pi-plus"
              className="p-button-text p-button-sm"
              onClick={() => initCreate(node.key, "file")}
            />
          </>
        )}
        <Button
          label="Rename"
          icon="pi pi-plus"
          className="p-button-text p-button-sm"
          onClick={() => initChangeName(node.key, node.label, node.data)}
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
        // className="p-tree-container"
      />
    </div>
  );
};
