import gql from 'graphql-tag';
import divisionFragment from '@/graphql/fragments/division';

export const DIVISIONS_QUERY = gql`
  query getDivisions {
    divisions {
      ...divisionFragment
    }
  }
  ${divisionFragment}
`;

export const DIVISION_CHILDREN_QUERY = gql`
  query getDivisionChildren($parentId: ID!) {
    divisionChildren(id: $parentId) {
      ...divisionFragment
    }
  }
  ${divisionFragment}
`;