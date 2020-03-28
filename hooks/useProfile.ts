import { useMutation } from "@apollo/react-hooks";
import { Profile } from "../types";
import { EDIT_PROFILE } from "../query/profile";

export default () => {
  const [editProfileMutation] = useMutation<{ editProfile: Profile }>(EDIT_PROFILE);
  return {
    editProfileMutation
  };
};
