import { InputText } from "primereact/inputtext";
import { useEditFormStore } from "../../store";

export const EditForm = ({ ...props }) => {
  const { value, setValue } = useEditFormStore();

  return (
    <InputText
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};
