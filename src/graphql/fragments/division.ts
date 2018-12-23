import gql from "graphql-tag";

const divisionFragment = gql`
  fragment divisionFragment on Division {
    id
    name
    ancestry
    ancestorName
    children {
      id
      name
      ancestry
      ancestorName
    }
  }
`;

export default divisionFragment;
