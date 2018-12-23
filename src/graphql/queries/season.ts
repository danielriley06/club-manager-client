import gql from "graphql-tag";

export const SEASONS_QUERY = gql`
  query GetSeasons {
    seasons {
      id
      name
      startDate
      endDate
      active
    }
  }
`;

export default SEASONS_QUERY;
