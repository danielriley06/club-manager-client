import gql from "graphql-tag";

const divisionFieldsFragment = gql`
  fragment divisionFieldsFragment on Division {
    id
    name
    ancestry
  }
`;

export default divisionFieldsFragment;
