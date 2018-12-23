import gql from "graphql-tag";

export const AGE_GROUPS_QUERY = gql`
  query GetAgeGroups {
    ageGroups {
      id
      title
    }
  }
`;

export default AGE_GROUPS_QUERY;
