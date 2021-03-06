import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
  mutation editProfile($age: Int, $gender: Gender, $bio: String, $interests: String, $favoriteBook: String) {
    editProfile(age: $age, gender: $gender, bio: $bio, interests: $interests, favoriteBook: $favoriteBook) {
      id
    }
  }
`;

export default EDIT_PROFILE;
