import gql from "graphql-tag";
import userFragment from "../fragments/user";

export const CREATE_USER = gql`
  mutation createUser($parentId: String, $name: String!, $description: String) {
    createUser(parentId: $parentId, name: $name, description: $description) {
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;

export const UPDATE_USER = gql`
  mutation($avatar: Upload!) {
    updateUser(avatar: $avatar) {
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;
