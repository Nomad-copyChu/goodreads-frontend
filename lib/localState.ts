import { gql } from "apollo-boost";
import { GET_CACHE_USER } from "../query/user";

export const typeDefs = gql`
  type Query {
    getCacheUser: User
  }
  type User {
    id: ID!
    email: String!
    username: String!
    profilePhoto: String!
    isAdmin: Boolean
    shelves: [Shelf]
  }
`;
export const resolvers = {
  Query: {
    getCacheUser: (_, __, { cache }) => {
      const user = cache.readQuery({ query: GET_CACHE_USER });
      return user;
    }
  }
};
export default { typeDefs, resolvers };
