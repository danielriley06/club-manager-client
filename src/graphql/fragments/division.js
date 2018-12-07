import gql from 'graphql-tag';

const divisionFragment = gql`
  fragment divisionFragment on Division {
    id
    name
    ancestry
    children {
      id
      name
      ancestry
    }
  }
`;

export default divisionFragment;
