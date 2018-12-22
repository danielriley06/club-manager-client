import gql from "graphql-tag";
import teamFragment from "../fragments/team";

const GET_TEAMS = gql`
  query getTeams($page: Int!) {
    teams(page: $page) {
      ...teamFragment
    }
    teamsTotal
  }

  ${teamFragment}
`;

export default GET_TEAMS;
