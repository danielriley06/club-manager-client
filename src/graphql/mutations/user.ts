import gql from "graphql-tag";
import userFragment from "../fragments/user";

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $clubRole: String!
    $gender: String!
    $dateOfBirth: ISO8601DateTime!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      clubRole: $clubRole
      gender: $gender
      dateOfBirth: $dateOfBirth
    ) {
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($avatar: Upload!) {
    updateUser(avatar: $avatar) {
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;
