import React, { useState } from "react";
import useUpload from "../hooks/useUpload";

const upload: React.FC = () => {
  const { fileUploadMuation } = useUpload();
  const [value, setValue] = useState();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files![0];
    fileUploadMuation({ variables: { file } }).then(res => setValue(res));
  };
  console.log(value);
  return <input type="file" onChange={onChange} />;
};

export default upload;
