import { gql } from "apollo-boost";

const GITHUB_LOGIN = gql`
  mutation githubLogin($code: String!) {
    githubLogin(code: $code) {
      token
      isFirst
    }
  }
`;

export default GITHUB_LOGIN;
