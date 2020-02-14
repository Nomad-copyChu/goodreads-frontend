import { gql } from "apollo-boost";

const GITHUB_LOGIN = gql`
  mutation githubLogin($code: String!) {
    githubLogin(code: $code)
  }
`;

export default GITHUB_LOGIN;
