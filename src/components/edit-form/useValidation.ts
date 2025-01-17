// import { DataType, FolderTree } from "../../types/folder-tree.ts";
//
// interface ValidationResult {
//   validate: (name: FolderTree["label"], validationType: DataType) => string;
// }
//
// export const useValidation = (): ValidationResult => {
//   const validateFolderName = (name: FolderTree["label"]): string => {
//     const invalidCharacters = /[\\/:*?"<>|.]/;
//     if (!name.trim()) return "Имя папки не может быть пустым.";
//     if (invalidCharacters.test(name))
//       return 'Имя папки содержит недопустимые символы: \\ / : * ? " < > | .';
//     if (name.length > 255)
//       return "Имя папки не может быть длиннее 255 символов.";
//     return "";
//   };
//
//   const validateFileName = (name: FolderTree["label"]): string => {
//     const invalidCharacters = /[\\/:*?"<>|]/;
//     const allowedExtensions = [".jsx", ".js", ".ts", ".tsx", ".json", ".css"];
//     if (!name.trim()) return "Имя файла не может быть пустым.";
//     if (invalidCharacters.test(name))
//       return 'Имя файла содержит недопустимые символы: \\ / : * ? " < > |';
//     const extension = name.slice(name.lastIndexOf("."));
//     if (!allowedExtensions.includes(extension)) {
//       return `Имя файла должно содержать одно из допустимых расширений: ${allowedExtensions.join(", ")}`;
//     }
//     return "";
//   };
//
//   const validate = (
//     name: FolderTree["label"],
//     validationType: DataType,
//   ): string => {
//     if (validationType === "folder") {
//       return validateFolderName(name);
//     } else if (validationType === "file") {
//       return validateFileName(name);
//     }
//     return "Неизвестный тип валидации.";
//   };
//
//   return {
//     validate,
//   };
// };
