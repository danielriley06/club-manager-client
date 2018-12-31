import gql from "graphql-tag";

const divisionFragment = gql`
  fragment divisionFragment on Division {
    id
    name
    parentId
    children {
      id
      name
      parentId
    }
  }
`;

export default divisionFragment;
