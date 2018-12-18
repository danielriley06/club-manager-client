import gql from "graphql-tag";

const teamFragment = gql`
  fragment teamFragment on Team {
    id
    name
    level
    gender
    zipCode
    timeZone
    club {
      id
      name
    }
    ageGroup {
      id
      title
    }
    division {
      id
      name
    }
    season {
      id
      name
      startDate
      endDate
      active
    }
    members {
      id
    }
  }
`;

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
