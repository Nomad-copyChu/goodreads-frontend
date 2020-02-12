import { useMutation } from "@apollo/react-hooks";
import { FILE_UPLOAD } from "../query/upload";

const useUpload = () => {
  /**
   * * 파일 업로드 Mutation
   */
  const [fileUploadMuation] = useMutation<{ singleUpload: string }>(FILE_UPLOAD);

  return { fileUploadMuation };
};
export default useUpload;
