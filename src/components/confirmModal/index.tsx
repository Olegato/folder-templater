import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useConfirmModalStore, useEditFormStore } from "../../store";
import { EditForm } from "../edit-form";
import { useActions } from "../actions-menu/useActions.ts";

export const ConfirmModal = () => {
  const { isOpen, handleVisibleModal } = useConfirmModalStore();
  const { value, setValue } = useEditFormStore();
  const { addChileNode } = useActions();

  const onConfirm = () => {
    addChileNode(value);
    onClose();
  };

  const onClose = () => {
    setValue("");
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
