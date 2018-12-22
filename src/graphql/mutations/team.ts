import gql from "graphql-tag";
import teamFragment from "../fragments/team";

const CREATE_TEAM = gql`
  mutation createTeam(
    $name: String!
    $seasonId: String!
    $divisionId: String!
    $ageGroupId: String
  ) {
    createTeam(
      name: $name
      seasonId: $seasonId
      divisionId: $divisionId
      ageGroupId: $ageGroupId
    ) {
      team {
        ...teamFragment
      }
    }
  }
  ${teamFragment}
`;

export default CREATE_TEAM;
