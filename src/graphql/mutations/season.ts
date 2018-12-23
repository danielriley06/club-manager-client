import gql from "graphql-tag";
import seasonFragment from "../fragments/season";

const CREATE_SEASON = gql`
  mutation CreateSeason(
    $name: String!
    $startDate: String
    $endDate: String
    $active: Boolean
  ) {
    createSeason(
      name: $name
      startDate: $startDate
      endDate: $endDate
      active: $active
    ) {
      season {
        ...seasonFragment
      }
    }
  }
  ${seasonFragment}
`;

export default CREATE_SEASON;
