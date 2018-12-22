import gql from "graphql-tag";

const seasonFragment = gql`
  fragment seasonFragment on Season {
    id
    name
    startDate
    endDate
    active
  }
`;

export default seasonFragment;
