import { FolderTree } from "../../components/folder-tree";
import { ConfirmModal } from "../../components/confirm-modal";
import { OutputScript } from "../../components/output-script";

export const MainPage = () => {
  return (
    <div>
      <FolderTree />
      <ConfirmModal />
      <OutputScript />
    </div>
  );
};
