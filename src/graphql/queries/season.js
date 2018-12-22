import gql from "graphql-tag";

export const SEASONS_QUERY = gql`
  query getSeasons {
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
