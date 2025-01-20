import { InputText } from "primereact/inputtext";
import { useEditFormStore } from "../../store";

export const EditForm = ({ ...props }) => {
  const { value, setValue, error } = useEditFormStore();

  return (
    <div className="flex flex-column gap-2">
      <InputText
        id="name"
        autoFocus
        value={value}
        invalid={Boolean(error)}
        onChange={(e) => setValue(e.target.value)}
        aria-describedby="name-help"
        className={"w-full"}
        {...props}
      />
      {error && (
        <small className={"text-red-600"} id="name-help">
          {error}
        </small>
      )}
    </div>
  );
};
