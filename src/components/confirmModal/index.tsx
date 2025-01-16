import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  useConfirmModalStore,
  useEditFormStore,
  useFolderTreeStore,
} from "../../store";
import { EditForm } from "../edit-form";
import { useActions } from "../actions-menu/useActions.ts";
import { DataType } from "../../types/folder-tree.ts";
import { useValidation } from "../edit-form/useValidation.ts";

export const ConfirmModal = () => {
  const { isOpen, handleVisibleModal } = useConfirmModalStore();
  const { value, setError, resetForm } = useEditFormStore();
  const { editableState } = useFolderTreeStore();
  const { addChileNode } = useActions();
  const { validate } = useValidation();

  const onConfirm = () => {
    const error = validate(value, editableState.editableNodeType as DataType);
    if (error) {
      setError(error);
    } else {
      addChileNode(value);
      onClose();
    }
  };

  const onClose = () => {
    resetForm();
    handleVisibleModal();
  };

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => onClose()}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={() => onConfirm()} />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Header"
        visible={isOpen}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!isOpen) return;
          onClose();
        }}
        footer={footerContent}
      >
        <EditForm />
      </Dialog>
    </div>
  );
};
