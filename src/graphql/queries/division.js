import gql from "graphql-tag";
import divisionFragment from "../fragments/division";

export const ALL_DIVISIONS_QUERY = gql`
  query getDivisions {
    allDivisions {
      ...divisionFragment
    }
  }
  ${divisionFragment}
`;

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
