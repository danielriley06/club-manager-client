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
      description
      parentId
      children {
        id
        name
        parentId
      }
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

export default teamFragment;
