import { DataType, FolderTree } from "../types/folder-tree.ts";

const validationRules = {
  folder: {
    invalidCharacters: /[\\/:*?"<>|.]/,
    maxLength: 255,
    errorMessage:
      'Имя папки содержит недопустимые символы: \\ / : * ? " < > | .',
  },
  file: {
    invalidCharacters: /[\\/:*?"<>|]/,
    allowedExtensions: [".jsx", ".js", ".ts", ".tsx", ".json", ".css"],
    errorMessage:
      'Имя файла содержит недопустимые символы: \\ / : * ? " < > | .',
  },
};

export const useValidation = () => {
  const validateFolderName = (name: string) => {
    const { invalidCharacters, maxLength, errorMessage } =
      validationRules.folder;
    if (!name.trim()) return "Имя папки не может быть пустым.";
    if (invalidCharacters.test(name)) return errorMessage;
    if (name.length > maxLength)
      return "Имя папки не может быть длиннее 255 символов.";
    return "";
  };

  const validateFileName = (name: string) => {
    const { invalidCharacters, allowedExtensions, errorMessage } =
      validationRules.file;
    if (!name.trim()) return "Имя файла не может быть пустым.";
    if (invalidCharacters.test(name)) return errorMessage;
    const extension = name.slice(name.lastIndexOf("."));
    if (!allowedExtensions.includes(extension))
      return "Недопустимое расширение файла.";
    return "";
  };

  const validateByType = (
    name: FolderTree["label"],
    validationType: DataType,
  ): string => {
    if (validationType === "folder") {
      return validateFolderName(name as string);
    } else if (validationType === "file") {
      return validateFileName(name as string);
    }
    return "Неизвестный тип валидации.";
  };

  return {
    validateByType,
  };
};
