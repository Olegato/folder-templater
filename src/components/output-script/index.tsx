import { Fieldset } from "primereact/fieldset";
import { useState } from "react";
import { useGenerateOutputScript } from "../../hooks/useGenerateOutputScript.ts";
import { useFolderTreeStore } from "../../store";

export const OutputScript = () => {
  const [scriptText, setScriptText] = useState("Here will be output script");
  const { tree } = useFolderTreeStore();
  const { generateScript } = useGenerateOutputScript();

  const onRunClick = () => {
    const script = generateScript(tree);
    setScriptText(script);
  };

  const legendTemplate = (
    <div
      className="flex align-items-center gap-2 px-2 cursor-pointer"
      onClick={onRunClick}
    >
      <span className="pi pi-play text-green-400"></span>
      <span className="font-bold">Run to generage script</span>
    </div>
  );

  return (
    <div className="card">
      <Fieldset legend={legendTemplate}>
        <p className="m-0">{scriptText}</p>
      </Fieldset>
    </div>
  );
};
