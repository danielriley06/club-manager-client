import gql from 'graphql-tag';
import userFragment from '@/graphql/fragments/user';

export const USERS_QUERY = gql`
  query users($page: Int!) {
    usersCount
    users(page: $page) {
      ...userFragment
    }
  }

  ${userFragment}
`;

export const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    currentUser {
      ...userFragment
    }
  }

  ${userFragment}
`;
