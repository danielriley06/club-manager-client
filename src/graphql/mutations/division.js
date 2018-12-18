import gql from "graphql-tag";
import divisionFragment from "../fragments/division";

const CREATE_DIVISION = gql`
  mutation createDivision(
    $parentId: String
    $name: String!
    $description: String
  ) {
    createDivision(
      parentId: $parentId
      name: $name
      description: $description
    ) {
      division {
        ...divisionFragment
      }
    }
  }
  ${divisionFragment}
`;

export default CREATE_DIVISION;
