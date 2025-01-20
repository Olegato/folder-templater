import { FolderTree } from "../types/folder-tree.ts";

export const useGenerateOutputScript = () => {
  //нужен ли хук?

  const generatePath = (path: string, label?: string): string => {
    return `${path.length > 0 ? path + "/" : path}${label}`;
  };

  const generateScript = (
    structure: FolderTree[],
    rootPath: string = "",
  ): string => {
    let script = "";

    structure.forEach((item) => {
      if (item.data === "folder") {
        const folderPath = generatePath(rootPath, item.label);
        script += `mkdir -p "${folderPath}"\n`;

        if (item.children && item.children.length > 0) {
          script += generateScript(item.children, folderPath);
        }
      } else if (item.data === "file") {
        const filePath = generatePath(rootPath, item.label);
        script += `touch "${filePath}"\n`;
      }
    });

    return script;
  };

  return { generateScript };
};
