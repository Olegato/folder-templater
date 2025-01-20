import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useConfirmModalStore } from "../../store";
import { EditForm } from "../edit-form";
import { useCrudActions } from "../../hooks/useCrudActions.ts";

export const ConfirmModal = () => {
  const { isOpen, handleVisibleModal } = useConfirmModalStore();

  const { onResetEdit, onCreateNode } = useCrudActions();

  const onCancel = () => {
    handleVisibleModal();
    onResetEdit();
  };

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => onCancel()}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={() => onCreateNode()} />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={isOpen}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!isOpen) return;
          onCancel();
        }}
        footer={footerContent}
      >
        <EditForm />
      </Dialog>
    </div>
  );
};
