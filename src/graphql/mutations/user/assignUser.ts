import gql from "graphql-tag";
import userFragment from "../../fragments/user";

const ASSIGN_USER = gql`
  mutation CreateUser($userId: ID!, $teamId: ID!) {
    createUser(userId: $userId, teamId: $teamId) {
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`;

export default ASSIGN_USER;
