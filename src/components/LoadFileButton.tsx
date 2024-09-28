import React, { ReactElement, useRef, useState } from "react";
import { z, ZodSchema } from "zod";
import "./LoadFileButton.css";

export type LoadFileButtonProps<T extends ZodSchema> = {
  fileSchema: T;
  onSuccess: (data: z.infer<T>) => void;
  title: string;
  hideFilename?: boolean;
  preventDefault?: () => void;
};

export function LoadFileButton<T extends ZodSchema>({
  fileSchema,
  onSuccess,
  title,
  hideFilename,
  preventDefault,
}: LoadFileButtonProps<T>): ReactElement {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState("");

  const onOpenFile = () => {
    // `current` points to the mounted file input element
    inputFile?.current?.click();
  };

  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.result) {
      const raw_data: string =
        typeof fileReader.result === "string"
          ? fileReader.result
          : Buffer.from(fileReader.result).toString();
      // const parseResult = bookModelSchema.safeParse(JSON.parse(raw_data));
      const parseResult = fileSchema.safeParse(JSON.parse(raw_data));
      if (parseResult.success) {
        onSuccess(parseResult.data);
      } else {
        setFilename(`Wrong file selected.`);
      }
    }
  };

  return (
    <div className="loadFileButtonContainer">
      <input
        type="file"
        accept=".json"
        ref={inputFile}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFilename(file.name);
            fileReader.readAsText(file);
          }
        }}
        style={{ display: "none" }}
      />
      <button onClick={() => {
        if (preventDefault) {
          preventDefault();
        } else {
          onOpenFile();
        }
      }}>{title}</button>
      {!hideFilename && <div>{filename}</div>}
    </div>
  );
}
