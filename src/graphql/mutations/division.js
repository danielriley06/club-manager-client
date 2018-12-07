import gql from 'graphql-tag';
import divisionFragment from '@/graphql/fragments/division';

export const CREATE_DIVISION = gql`
  mutation createDivision($parentId: String, $name: String!, $description: String) {
    createDivision(parentId: $parentId, name: $name, description: $description) {
      division {
        ...divisionFragment
      }
    }
  }
  ${divisionFragment}
`;
