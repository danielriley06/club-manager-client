import gql from "graphql-tag";
import userFragment from "../fragments/user";

export const USERS_QUERY = gql`
  query GetUsers($page: Int!) {
    usersCount
    users(page: $page) {
      ...userFragment
    }
  }

  ${userFragment}
`;

export const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      ...userFragment
    }
  }

  ${userFragment}
`;
